export interface iPostCreateAdminMemberResp {
	userId: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	userName: string;
	_id: string;
	__v: number;
}

export interface iPostCreateAdminMemberErr {
	status: string;
}

export interface iPostCreateAminMemberReq {
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	userName: string;
}

export interface iPostCheckPinReq {
	userId: string;
	pin: number;
}
