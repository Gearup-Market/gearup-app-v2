import { Routes } from "@/types";
import WalletRoute from "./wallet.routes";
import TransactionRoute from "./transaction.routes";
import PaymentRoute from "./payment.routes";

const Route: Routes[] = [new WalletRoute(), new TransactionRoute(), new PaymentRoute()];

export default Route;
