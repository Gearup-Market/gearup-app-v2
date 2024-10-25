import { AxiosError } from "axios";
import { IUser, IUserResp } from "../../users/types";

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
    data: RoleProps
}

export interface RoleProps {
    _id: string;
    roleName: string;
    permissions: RolePermissions;
}


export interface IGetAllUsersResp{
    data: IUser[]
}

export interface IGetUsersTotalResp {
    total: number;
}