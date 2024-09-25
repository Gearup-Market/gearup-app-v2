import { Routes } from "@/types";
import CartRoute from "./cart.routes";
import TransactionRoute from "./transaction.routes";

const Route: Routes[] = [new CartRoute(), new TransactionRoute()];

export default Route;
