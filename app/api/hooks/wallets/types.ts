import { AxiosError } from "axios";

export interface iWallet {
	_id: string;
	balance: number;
	pendingDebit: number;
	pendingCredit: number;
	currency: string;
	accountName: string;
	accountNumber: string;
	bankName: string;
	status: WalletStatus;
	createdAt?: string;
}

export enum WTransactionStatus {
	Pending = "pending",
	Completed = "completed",
	Failed = "cancelled"
}

export enum WTransactionType {
	Credit = "credit",
	Debit = "debit"
}

export interface iWTransaction {
	_id: string;
	amount: number;
	type: WTransactionType;
	description?: string;
	status: WTransactionStatus;
	createdAt: string;
}

export enum WalletStatus {
	Active = "active",
	Frozen = "frozen"
}

export interface iWalletResp {
	data: iWallet;
	message: string;
}

export interface StellarAssetBalance {
	asset: string;
	balance: string;
}

export interface StellarWallet {
	_id: string;
	publicKey: string;
	xlmBalance: string;
	balances: StellarAssetBalance[];
	status: WalletStatus;
	createdAt?: string;
}

export interface StellarTransaction {
	id: string;
	createdAt: string;
	fee: string;
	memo?: string;
	memoType?: string;
	operationCount: number;
	sourceAccount: string;
	successful: boolean;
	feeAccount?: string;
	transfers: TransferDetail[];
	totalReceived: string;
	totalSent: string;
	hash: string;
}

export interface TransferDetail {
	amount: string;
	asset: string;
	from: string;
	to: string;
	type: "incoming" | "outgoing";
}

export interface iStellarWalletResp {
	data: StellarWallet;
	message: string;
}

export interface iWTransactionResp {
	data: {
		transactions: iWTransaction[];
		pagination: {
			currentPage: number;
			totalCount: number;
		};
	};
	message: string;
}

export interface iStellarTransactionResp {
	data: {
		transactions: StellarTransaction[];
		nextCursor: string;
	};
	message: string;
}

export type iPostUpdateBankResp = {
	data: iWallet;
	message: string;
};

export type iPostUpdateBankRsq = {
	accountName: string;
	accountNumber: string;
	bankName: string;
};

export interface iTransferXLMResp {
	data: {
		hash: string;
		link: string;
	};
	message: string;
}

export interface iTransferXLMReq {
	userId: string;
	recipientPublicKey: string;
	amount: string;
}
