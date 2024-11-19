import { AxiosError } from "axios";

export interface IGetWithdraw {
	_id: string;
	withdrawalId: string;
	userId: string;
	amount: number;
	bankName: string;
	accountNumber: string;
	accountName: string;
	status: string;
	createdAt: string;
	__v: number;
}

export interface IGetAllWithdraw {
	data: IGetWithdraw[];
	message: string;
}

export type IGetErr = AxiosError<{ status: string }>;

export interface iPostWithdrawalRequestRsq {
	status: "approved" | "rejected";
	reason?: string;
}

export interface iPostWithdrawalRequestResp {
	message: string;
	data: {
		_id: string;
		withdrawalId: string;
		userId: string;
		amount: number;
		bankName: string;
		accountNumber: string;
		accountName: string;
		status: "approved" | "rejected";
		createdAt: string;
		__v: number;
		processedAt: string;
		updatedAt: string;
		reason?: string;
	};
}

export type iPostWithdrawalRequestErr = AxiosError<{
	message?: string;
	error?: string;
}>;
