import { AxiosError } from "axios";
import { IUser, IUserResp } from "../../users/types";
import { VerificationState } from "@/store/slices/verificationSlice";

export interface Permissions {
	view: boolean;
	manage: boolean;
}

export interface RolePermissions {
	metrics: Permissions;
	users: Permissions;
	transactions: Permissions;
	wallet: Permissions;
}

export interface ICreateRoleReq {
	roleName: string;
	permissions?: RolePermissions;
}

export type IGetErr = AxiosError<{ status: string }>;

export interface IGetAdminRolesResp {
	data: RoleProps;
}

export interface RoleProps {
	_id: string;
	roleName: string;
	permissions: RolePermissions;
}

export interface IGetAllUsersResp {
	data: IUser[];
}

export type Kyc = VerificationState & { userId: IUser };
export interface IGetAllKycResp {
	data: Kyc[];
}

export interface IGetKycResp {
	data: Kyc;
}

export interface IGetUsersTotalResp {
	totalUsers: number;
}

export type iPostAdminSignInResp = {
	data: {
		token: string;
		user: {
			_id: string;
			userId: string;
			email: string;
			password: string;
			userName: string;
			isVerified: boolean;
			createdAt: string;
		};
	};
	message: string;
};

export type iPostAdminSignInErr = AxiosError<{
	message?: string;
	error?: string;
}>;

export type iPostAdminSignInRsq = {
	email: string;
	password: string;
};

export type iPostAdminUpdateKycRsq = {
	userId: string;
	action: "approve" | "reject";
	rejectionMessage?: string;
};
