import { Types } from "mongoose";

export type IWeb3Wallet = {
    userId: string;
    publicKey: string;
    encryptedKey: string;
    password: string;
    isActive: boolean;
    isMaster: boolean;
}

export type WalletWithBalance = IWeb3Wallet & {
    xlmBalance: string;
    balances: {
        asset: string;
        balance: string;
    }[];
}