import { iPostRegisterKycReq, iPostSubmitKycReq } from "@/app/api/hooks/users/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup";

export type VerificationState = Omit<iPostRegisterKycReq, "userId" | "documentType"> & {
	userId?: string;
	documentNo?: string;
	// documentType?: iPostSubmitKycReq["documentType"];
	selfie?: string;
	birthDate: string;
	birthMonth: string;
	birthYear: string;
	resendCodeCountdown: number;
	_id: string;
	isPhoneNumberVerified?: boolean;
	isLoading: boolean;
	isSubmitted: boolean;
	isApproved: boolean;
	isRejected: boolean;
	rejectionMessage: string;
	createdAt?: string;
	hasResubmitted: boolean;
};

const initialState: VerificationState = {
	firstName: "",
	lastName: "",
	birthday: "",
	nin: "",
	country: "",
	address: "",
	postalCode: "",
	city: "",
	birthDate: "",
	birthMonth: "",
	birthYear: "",
	phoneNumber: "",
	documentNo: "",
	// documentType: "intl_passport",
	documentPhoto: "",
	selfie: "",
	resendCodeCountdown: 60,
	_id: "",
	isLoading: false,
	isSubmitted: false,
	isApproved: false,
	isRejected: false,
	rejectionMessage: "",
	hasResubmitted: false
};

const verificationSlice = createSlice({
	name: "verification",
	initialState,
	reducers: {
		updateVerification: (
			state,
			action: PayloadAction<Partial<VerificationState>>
		) => {
			Object.assign(state, action.payload);
		},
		clearState: state => initialState
	}
});

export default verificationSlice.reducer;
export const { updateVerification, clearState } = verificationSlice.actions;
