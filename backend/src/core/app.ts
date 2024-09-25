/* eslint-disable prettier/prettier */
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@/core/config';
import { logger, stream } from '@/core/utils/logger';
import DB from './databases';
import { errorMiddleware } from '@/lib';
import { Routes } from '@/types';
import { ChatModule } from '@/modules';
import { Server as SocketIOServer } from 'socket.io';
//import debug from "debug";





class App {
    public app: express.Application;
    public env: string;
    public port: string | number;
    private conn: DB;
    private chatModule?: ChatModule;
    constructor(routes: Routes[]) {
        //debug(this.constructor.name);

        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 8080;
        this.conn = DB.getInstance()

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
        this
        // Find and store reference to ChatModule for later initialization
        this.chatModule = routes.find(route => route instanceof ChatModule) as ChatModule;

    }

    public getAppInstance() {
        return this.app
    }

    public listen() {
        const server = this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
        return server
    }

    public async closeDatabaseConnection(): Promise<void> {
        try {
            this.conn.disconnect();
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    }

    private async connectToDatabase() {
        if (this.env === 'development') {
            set('debug', true);
        }
        this.conn.connect();
    }

    // initialise chat module
    public initializeChatModule(io: SocketIOServer): void {
        if (this.chatModule) {
            console.log('Initializing Chat Module with Socket.IO...');
            this.chatModule.initializeSocket(io);
        } else {
            console.error('ChatModule is not defined or incorrectly configured');
        }
    }
    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT, { stream }));
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression({
            threshold: 0, // Compress everything regardless of size
        }));
        this.app.use(express.json({limit: '20mb'}));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route: Routes) => {
            this.app.use('/api/v1', route.router);
        });
        //s console.log(this.app._router.stack);

        this.app.get('/health', this.handleHealthRequest)
        this.app.post('/api/v1/chats/new', (req, res) => {
            res.status(200).json({ message: "Direct chat route working" });
        });
        this.app.get('/api/v1/test-direct', (req, res) => res.json({ message: "Direct test route working" }));

    }

    private initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Gear up api documentation',
                },
            },
            apis: ['swagger.yaml'],
        };

        const specs = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private handleHealthRequest(req: Request, res: Response): void {
        res.json({ status: "OK" });
    }


}

export default App;
