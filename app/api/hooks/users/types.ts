import { AxiosError } from "axios";

export type iGetUserTransactionHistoryErr = AxiosError<any>;

// ----------------------------------------------
export type IUpdateUserPasswordErr =
  | AxiosError<string>
  | AxiosError<{ message: string; status?: string }>;
export interface IUpdateUserPasswordProps {
  currentPassword: string;
  newPassword: string;
}
export interface IUpdateUserPasswordRes {
  message: string;
}


export type IAddTokensErr = AxiosError<{ message: string; status: string }>;

export interface IAddTokensProps extends FormData {
  tokenName: string;
  price: string;
  file: string;
}

export interface IAddTokensRes {
  message: string;
}

// ----------------------------------------------
export type IResetPasswordErr = AxiosError<{
  message?: string;
  result?: string;
  error?: string;
}>;

export interface IResetPasswordProps {
  newPassword: string;
  token: string;
}

export interface IResetPasswordRes {
  message: string;
}

export type IResetPasswordRequestErr = AxiosError<{
  message: string;
  error?: string;
}>;

export interface IResetPasswordRequestProps {
  email: string;
}

export interface IResetPasswordRequestRes {
  status: string;
}

export type IAddPlatformsErr = AxiosError<{ message: string }>;
export interface IAddPlatformsProps {
  file: string;
  name: string;
  platform: string;
  url: string;
}
export interface IAddPlatformsRes {
  status: string;
}


export type iPostUserSignUpErr = AxiosError<{
  message?: string;
  error?: string;
}>;
export type iPostUserSignUpResp = {
  status: string;
  data: {
    email: string;
    name: string;
    phone_number: string;
    token: string;
    role: number;
  };
};

export type iPostUserSignUpRsq = {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
};

// ----------------------------------------------
export type iPostUserSignInErr = AxiosError<{
  message?: string;
  error?: string;
}>;

export type iPostUserSignInResp = {
    data: {
        token: string
        user: {
            _id: string
            userId: string
            email: string
            password: string
            userName: string
            isVerified: boolean,
            resetPasswordToken: string,
            verificationTokenExpiry: string
            createdAt: string
            resetPasswordTokenExpiry: string
        }
    },
    message: string

};

export type iPostUserSignInRsq = {
  email: string;
  password: string;
};

export type iPostVerifyOTPErr = AxiosError<{
  error?: string;
  message?: string;
  status?: string;
}>;

export type iPostVerifyOTPResp = {
  status: string;
  data: {
    avatar: string;
    email: string;
    name: string;
    phone_number: string;
    role: number;
    token: string;
  };
};

export type iPostVerifyOTPRsq = {
  otp: string;
};

export type iPostUpdateUserErr = AxiosError<{
  error?: string;
  message?: string;
  status?: string;
}>;

export type iPostUpdateUserResp = {
  status: string;
  user: {
    avatar: string;
    email: string;
    name: string;
    phone_number: string;
    roles: number;
    token: string;
  };
};

export type iPostUpdateUserRsq = {
  formData: FormData;
};

