import { iPostRegisterKycReq } from "@/app/api/hooks/users/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VerificationState = Omit<iPostRegisterKycReq, "userId" | "documentType"> & {
	userId?: string;
	documentType?: iPostRegisterKycReq["documentType"];
	birthDate: string;
	birthMonth: string;
	birthYear: string;
  resendCodeCountdown: number;
  _id: string;
  isPhoneNumberVerified?: boolean;
  isLoading: boolean;
  isSubmitted: boolean;
  isApproved: boolean;
};

const initialState: VerificationState = {
	firstName: "",
	lastName: "",
	birthday: "",
	bvn: "",
	country: "",
	address: "",
	postalCode: "",
	city: "",
	birthDate: "",
	birthMonth: "",
	birthYear: "",
	phoneNumber: "",
	documentType: "intl_passport",
	documentPhoto: [],
  resendCodeCountdown: 60,
  _id: "",
  isLoading: false,
  isSubmitted: false,
  isApproved: false
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
