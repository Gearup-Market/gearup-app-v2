import { api, queryClient } from "../../api";
import { AxiosError } from "axios";
import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions,
} from "@tanstack/react-query";
import { API_URL } from "../../url";
import {
	IResetPasswordErr,
	IResetPasswordProps,
	IResetPasswordRequestErr,
	IResetPasswordRequestProps,
	IResetPasswordRequestRes,
	IResetPasswordRes,
	iPostUserSignInErr,
	iPostUserSignInResp,
	iPostUserSignInRsq,
	iPostUserSignUpErr,
	iPostUserSignUpResp,
	iPostUserSignUpRsq,
} from "./types";

// ----------------------------------------------

const useResetPassword = (
	options?: UseMutationOptions<
		IResetPasswordRes,
		IResetPasswordErr,
		IResetPasswordProps
	>
) =>
	useMutation<IResetPasswordRes, IResetPasswordErr, IResetPasswordProps>({
		mutationFn: async props =>
			(
				await api.post(API_URL.resetPassword, {
					newPassword: props.newPassword,
					token: props.token,
				})
			).data,
		...options,
	});

// ----------------------------------------------

const useResetPasswordRequest = (
	options?: UseMutationOptions<
		IResetPasswordRequestRes,
		IResetPasswordRequestErr,
		IResetPasswordRequestProps
	>
) =>
	useMutation<
		IResetPasswordRequestRes,
		IResetPasswordRequestErr,
		IResetPasswordRequestProps
	>({
		mutationFn: async props =>
			(await api.post(API_URL.sendResetPasswordEmail, { email: props?.email }))
				.data,
		...options,
	});

// ----------------------------------------------

const usePostUserSignUp = (
	options?: Omit<
		UseMutationOptions<iPostUserSignUpResp, iPostUserSignUpErr, iPostUserSignUpRsq>,
		"mutationFn"
	>
) =>
	useMutation<iPostUserSignUpResp, iPostUserSignUpErr, iPostUserSignUpRsq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.signUp, {
					...props,
				})
			).data,
		...options,
	});

// ----------------------------------------------

const usePostUserSignIn = (
	options?: Omit<
		UseMutationOptions<iPostUserSignInResp, iPostUserSignInErr, iPostUserSignInRsq>,
		"mutationFn"
	>
) =>
	useMutation<iPostUserSignInResp, iPostUserSignInErr, iPostUserSignInRsq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.signIn, {
					...props,
				})
			).data,
		...options,
	});

// ----------------------------------------------
export type iPostResendOTPErr = AxiosError<{
	error: string;
}>;
export type iPostResendOTPResp = {
	status: string;
};
export type iPostResendOTPRsq = {
	email: string;
	phoneNumber?: string;
};

const usePostResendOTP = (
	options?: Omit<
		UseMutationOptions<iPostResendOTPResp, iPostResendOTPErr, iPostResendOTPRsq>,
		"mutationFn"
	>
) =>
	useMutation<iPostResendOTPResp, iPostResendOTPErr, iPostResendOTPRsq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.resendOTP, {
					...props,
				})
			).data,
		...options,
	});

// ----------------------------------------------

const useGetVerifyOTP = ({ otp }: { otp: string }) => {
	return useQuery<any, any, any>({
		queryKey: ["verifyOTP"],
		queryFn: async () => {
			const response = await api.get(`${API_URL.verifyOTP}/${otp}`);
			return response.data;
		},
		enabled: !!otp,
	});
};

// ----------------------------------------------
export type IGetCardHistoriesErr = AxiosError<{ status: string }>;

const useGetUser = (
	{ token }: { token: string },
	options?: UseQueryOptions<any, IGetCardHistoriesErr>
) =>
	useQuery<any, IGetCardHistoriesErr>({
		queryKey: ["user"],
		queryFn: async () =>
			await api.get(`${API_URL.getUser}/${token}`),
		...options,
		enabled: !!token,
		refetchOnMount: false,
	},
);

export {
	useResetPassword,
	useResetPasswordRequest,
	usePostUserSignUp,
	usePostUserSignIn,
	usePostResendOTP,
	useGetUser,
	useGetVerifyOTP,
};
