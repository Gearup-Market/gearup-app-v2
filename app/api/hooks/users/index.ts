import { api, queryClient } from "../../api";
import { AxiosError } from "axios";
import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions
} from "@tanstack/react-query";
import { API_URL } from "../../url";
import {
	IResetPasswordErr,
	IResetPasswordProps,
	IResetPasswordRequestErr,
	IResetPasswordRequestProps,
	IResetPasswordRequestRes,
	IResetPasswordRes,
	IUserResp,
	UserUpdateResp,
	iPostRegisterKycReq,
	iPostRegisterKycResp,
	iPostReviewResp,
	iPostReviewRsq,
	iPostSubmitKycReq,
	iPostSubmitKycRes,
	iPostUpdateBankResp,
	iPostUpdateBankRsq,
	iPostUserSignInErr,
	iPostUserSignInResp,
	iPostUserSignInRsq,
	iPostUserSignUpErr,
	iPostUserSignUpResp,
	iPostUserSignUpRsq
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
					email: props.email,
					newPassword: props.newPassword,
					token: props.token
				})
			).data,
		...options
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
		...options
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
					...props
				})
			).data,
		...options
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
					...props
				})
			).data,
		...options
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
					...props
				})
			).data,
		...options
	});

// ----------------------------------------------

const useGetVerifyOTP = ({ otp }: { otp: string }) => {
	return useQuery<any, any, any>({
		queryKey: ["verifyOTP"],
		queryFn: async () => {
			const response = await api.get(`${API_URL.verifyOTP}/${otp}`);
			return response.data;
		},
		enabled: !!otp
	});
};

// ----------------------------------------------

const useGetVerifyToken = ({ token }: { token: string }) => {
	return useQuery<any, any, any>({
		queryKey: ["verifyToken"],
		queryFn: async () => {
			const response = await api.get(`${API_URL.verifyToken}/${token}`);
			return response.data;
		},
		enabled: !!token,
		refetchOnMount: true,
		retry: false
	});
};

// ----------------------------------------------
export type IGetCardHistoriesErr = AxiosError<{ status: string }>;

const useGetUser = (
	{ userId }: { userId: string },
	options?: UseQueryOptions<any, IGetCardHistoriesErr>
) =>
	useQuery<any, IGetCardHistoriesErr>({
		queryKey: ["user"],
		queryFn: async () => (await api.get(`${API_URL.getUser}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: false
	});

const useGetUserDetails = (
	{ userId }: { userId: string },
	// refetchOnMount?: boolean,
	options?: UseQueryOptions<IUserResp, IGetCardHistoriesErr>
) =>
	useQuery<IUserResp, IGetCardHistoriesErr>({
		queryKey: ["user", userId],
		queryFn: async () => (await api.get(`${API_URL.getUser}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: false
	});

const useGetUserReviews = (
	{ userId }: { userId: string },
	// refetchOnMount?: boolean,
	options?: UseQueryOptions<any, any>
) =>
	useQuery<any, any>({
		queryKey: ["userReviews", userId],
		queryFn: async () => (await api.get(`${API_URL.getReviews}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: true
	});

// ----------------------------------------------

const usePostRegisterKyc = (
	options?: Omit<
		UseMutationOptions<
			iPostRegisterKycResp,
			iPostUserSignUpErr,
			Partial<iPostRegisterKycReq>
		>,
		"mutationFn"
	>
) =>
	useMutation<iPostRegisterKycResp, iPostUserSignUpErr, iPostRegisterKycReq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.registerKyc, {
					...props
				})
			).data,
		...options
	});

const usePostUpdateKyc = (
	options?: Omit<
		UseMutationOptions<
			iPostRegisterKycResp,
			iPostUserSignUpErr,
			Partial<iPostRegisterKycReq>
		>,
		"mutationFn"
	>
) =>
	useMutation<iPostRegisterKycResp, iPostUserSignUpErr, Partial<iPostRegisterKycReq>>({
		mutationFn: async props =>
			(
				await api.post(API_URL.updateKyc, {
					...props
				})
			).data,
		...options
	});

export const usePostSubmitKycDoc = (
	options?: Omit<
		UseMutationOptions<iPostSubmitKycRes, iPostUserSignUpErr, iPostSubmitKycReq>,
		"mutationFn"
	>
) =>
	useMutation<iPostSubmitKycRes, iPostUserSignUpErr, iPostSubmitKycReq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.submitKycDoc, {
					...props
				})
			).data,
		...options
	});

export type iPostResendKycCodeResp = {
	message: string;
	data: any;
};
export type iPostResendKycCodeReq = {
	userId: string;
	phoneNumber: string;
	code: string;
};

const usePostResendKycCode = (
	options?: Omit<
		UseMutationOptions<
			iPostResendKycCodeResp,
			iPostUserSignUpErr,
			Partial<iPostResendKycCodeReq>
		>,
		"mutationFn"
	>
) =>
	useMutation<
		iPostResendKycCodeResp,
		iPostUserSignUpErr,
		Partial<iPostResendKycCodeReq>
	>({
		mutationFn: async props =>
			(
				await api.post(API_URL.resendKycOtp, {
					...props
				})
			).data,
		...options
	});

const usePostValidateKycCode = (
	options?: Omit<
		UseMutationOptions<
			iPostResendKycCodeResp,
			iPostUserSignUpErr,
			Partial<iPostResendKycCodeReq>
		>,
		"mutationFn"
	>
) =>
	useMutation<
		iPostResendKycCodeResp,
		iPostUserSignUpErr,
		Partial<iPostResendKycCodeReq>
	>({
		mutationFn: async props =>
			(
				await api.post(API_URL.validateKycOtp, {
					...props
				})
			).data,
		...options
	});

const usePostSendOtpCode = (
	options?: Omit<
		UseMutationOptions<
			iPostResendKycCodeResp,
			iPostUserSignUpErr,
			Partial<iPostResendKycCodeReq>
		>,
		"mutationFn"
	>
) =>
	useMutation<
		iPostResendKycCodeResp,
		iPostUserSignUpErr,
		Partial<iPostResendKycCodeReq>
	>({
		mutationFn: async props =>
			(
				await api.post(API_URL.requestOtp, {
					...props
				})
			).data,
		...options
	});

const usePostValidateOtpCode = (
	options?: Omit<
		UseMutationOptions<
			iPostResendKycCodeResp,
			iPostUserSignUpErr,
			Partial<iPostResendKycCodeReq>
		>,
		"mutationFn"
	>
) =>
	useMutation<
		iPostResendKycCodeResp,
		iPostUserSignUpErr,
		Partial<iPostResendKycCodeReq>
	>({
		mutationFn: async props =>
			(
				await api.post(API_URL.validateOtp, {
					...props
				})
			).data,
		...options
	});

const usePostUpdateBank = (
	options?: Omit<
		UseMutationOptions<iPostUpdateBankResp, iPostUserSignInErr, iPostUpdateBankRsq>,
		"mutationFn"
	>
) =>
	useMutation<iPostUpdateBankResp, iPostUserSignInErr, iPostUpdateBankRsq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.updateBank, {
					...props
				})
			).data,
		...options
	});

const usePostReview = (
	options?: Omit<
		UseMutationOptions<iPostReviewResp, iPostUserSignInErr, iPostReviewRsq>,
		"mutationFn"
	>
) =>
	useMutation<iPostReviewResp, iPostUserSignInErr, iPostReviewRsq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.reviews, {
					...props
				})
			).data,
		...options
	});

const usePostUpdateUser = (
	options?: Omit<UseMutationOptions<UserUpdateResp, AxiosError, any>, "mutationFn">
) =>
	useMutation<UserUpdateResp, AxiosError, any>({
		mutationFn: async props =>
			(
				await api.post(API_URL.updateUser, {
					...props
				})
			).data.data,
		...options
	});

const usePostUpdateUserPin = (
	options?: Omit<UseMutationOptions<UserUpdateResp, AxiosError, any>, "mutationFn">
) =>
	useMutation<UserUpdateResp, AxiosError, any>({
		mutationFn: async props =>
			(
				await api.post(API_URL.updateUserPin, {
					...props
				})
			).data.data,
		...options
	});

const fetchUsersByIds = async (ids: string[]) => {
	const responses = await Promise.all(
		ids.map(id => api.get(`${API_URL.getUser}/${id}`))
	);
	return responses.map(res => res.data);
};

const useGetUsers = (userIds: string[], options?: UseQueryOptions<any[], Error>) =>
	useQuery<any[], Error>({
		queryKey: ["users", userIds],
		queryFn: () => fetchUsersByIds(userIds),
		enabled: userIds.length > 0,
		...options
	});

export {
	useResetPassword,
	useResetPasswordRequest,
	usePostUserSignUp,
	usePostUserSignIn,
	usePostResendOTP,
	useGetUser,
	useGetVerifyOTP,
	usePostRegisterKyc,
	usePostUpdateKyc,
	usePostResendKycCode,
	usePostValidateKycCode,
	usePostUpdateBank,
	usePostReview,
	useGetUserDetails,
	usePostUpdateUser,
	usePostUpdateUserPin,
	useGetVerifyToken,
	useGetUserReviews,
	usePostSendOtpCode,
	usePostValidateOtpCode,
	useGetUsers
};
