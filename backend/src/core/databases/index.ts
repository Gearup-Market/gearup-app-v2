/* eslint-disable prettier/prettier */
import { DB_HOST, DB_PORT, DB_DATABASE, db, NODE_ENV, DB_USER, DB_PASS } from '@/core/config';
import mongoose, { Mongoose } from 'mongoose';
import { logger } from '../utils/logger';

const defaultUrl = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${process.env.DB_DATABASE}`;
const defaultOptions: mongoose.ConnectOptions = {
    autoIndex: true,
    minPoolSize: db.minPoolSize,
    maxPoolSize: db.maxPoolSize,
    connectTimeoutMS: 60000,
    socketTimeoutMS: 45000,
};

function setRunValidators() {
    this.setOptions({ runValidators: true });
}

class DB {
    private url: string;
    private options: mongoose.ConnectOptions;
    private mongooseInstance: Mongoose;
    private static instance: DB;

    constructor(url?: string, options?: mongoose.ConnectOptions) {
        this.url = url || defaultUrl;
        this.options = options || defaultOptions;

        this.mongooseInstance = mongoose.plugin(schema => {
            schema.pre('findOneAndUpdate', setRunValidators);
            schema.pre('updateMany', setRunValidators);
            schema.pre('updateOne', setRunValidators);
            schema.pre('update', setRunValidators);
        });

        this.mongooseInstance.set('strictQuery', true);
        this.connectionEvents();
    }

    public static getInstance(): DB {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    public getConnection() {
        return this.mongooseInstance.connection;
    }

    public connect() {
        if (NODE_ENV !== 'production') {
            this.mongooseInstance.set('debug', true);
        }
        this.mongooseInstance
            .connect(this.url, this.options)
            .then(() => {
                logger.info('Mongoose connection done');
            })
            .catch(e => {
                logger.info('Mongoose connection error');
                logger.error(e);
            });
    }

    public disconnect(callback?: () => void) {
        this.mongooseInstance.connection.close().finally(() => {
            logger.info('Mongoose default connection disconnected through app termination');
            callback?.();
        });
    }

    private connectionEvents() {
        mongoose.connection.on('connected', () => {
            logger.debug('Mongoose default connection open to ' + this.url);
        });

        // If the connection throws an error
        mongoose.connection.on('error', err => {
            logger.error('Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', () => {
            logger.info('Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', () => {
            this.disconnect(() => {
                process.exit(0);
            });
        });
    }
}

export default DB;
