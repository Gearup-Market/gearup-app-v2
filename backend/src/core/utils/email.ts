/* eslint-disable prettier/prettier */

import { OtpType } from "@/modules/users/types";
import { transporter } from "../config/mailer";
import { BASE_URL } from "@/core/config";

export const sendVerificationEmail = async (
	email: string,
	token: string,
	otpType: OtpType
) => {
	try {
		const mailOptions = {
			from: "support@gearup.market",
			to: email,
			subject:
				otpType === OtpType.VerifyAccount
					? "Verify your account"
					: otpType === OtpType.ResetPassword
					? "Password Reset"
					: "Verify phone number",
			text:
				otpType === OtpType.VerifyAccount
					? `Please verify your account by clicking on the following link: ${BASE_URL}/users/verify/${token}/${email}`
					: otpType === OtpType.ResetPassword
					? `Your password reset token is ${token}. This token is valid for 1 hour.`
					: "",
		};
	
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
				
	}
};