import { Types } from "mongoose";

export enum WalletStatus {
    Active = 'active',
    Frozen = 'frozen'
}

export interface Wallet {
    _id: Types.ObjectId;
    userId: string;
    balance: number;
    pendingDebit: number;
    pendingCredit: number;
    currency: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    status: WalletStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum WTransactionType {
    Credit = 'credit',
    Debit = 'debit'
}

export enum WTransactionStatus {
    Pending = 'pending',
    Completed = 'completed',
    Failed = 'cancelled',
}

export enum PaymentMethod {
    Wallet = 'wallet',
    Paystack = 'paystack',
    XLM = 'xlm'
}

export interface WTransaction {
    _id: Types.ObjectId;
    userId: string;
    amount: number;
    type: WTransactionType;
    description: string;
    status: WTransactionStatus;
    reference?: string;
    method: PaymentMethod;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BankAccount {
    accountName: string;
    accountNumber: string;
    bankName: string;
    userId: string;
}

export interface Escrow {
    transaction: string;
    buyer: string;
    seller: string;
    status: EscrowStatus;
    amount: number;
    escrowProvider: EscrowProvider;
    createdAt: Date;
    updatedAt: Date;
}

export enum EscrowProvider {
    GearUpSoroban = 'GearUpSoroban',
    GearUpLocal = 'GearUpLocal'
}

export enum EscrowStatus {
    'PENDING' = 'pending', 
    'APPROVED' = 'approved', 
    'AWAITING_DELIVERY' = 'awaiting_delivery', 
    'RELEASED' = 'released', 
    'DISPUTE' = 'dispute',
}