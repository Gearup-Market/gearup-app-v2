import App from "@/core/app";
import validateEnv from "@/core/utils/validateEnv";
import {
	UserModule,
	ChatModule,
	ListingModule,
	StellarModule,
	TransactionModule,
	WalletModule,
	AdminModule,
} from "./modules";
import { Server as SocketIOServer } from "socket.io";

validateEnv();
const routes = [
	...AdminModule,
	...UserModule,
	...WalletModule,
	...TransactionModule,
	...ListingModule,
	new ChatModule(),
	new StellarModule(),
];
const app = new App(routes);
const server = app.listen();

const io = new SocketIOServer(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.initializeChatModule(io);

export { app, server };
