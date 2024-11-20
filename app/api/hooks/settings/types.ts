
export interface iPostCreateAdminMemberResp{
    userId: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string; 
    _id: string;
    __v: number;
  };

export interface iPostCreateAdminMemberErr{
    status: string;
}

export interface iPostCreateAminMemberReq {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };


  export interface iPostCheckPinReq{
    userId: string,
    pin: number
  }