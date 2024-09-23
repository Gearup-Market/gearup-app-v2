"use client";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./PhoneVerification.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { ConfirmToken, Countdown, InputField } from "@/shared";
import RevealDetails from "../RevealDetails/RevealDetails";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { Field, FieldProps, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { updateVerification } from "@/store/slices/verificationSlice";
import {
	usePostRegisterKyc,
	usePostResendKycCode,
	usePostUpdateKyc,
	usePostValidateKycCode
} from "@/app/api/hooks/users";
import { toast } from "react-hot-toast";

interface Props {
	setIsTokenVerified: (value: boolean) => void;
	isTokenVerification?: boolean;
	onSubmitSuccess: () => void;
}

type PhoneNumberForm = {
	phoneNumber: string;
};

export interface PhoneNumberFormHandle {
	submitForm: () => void;
}

const PhoneVerification = forwardRef<PhoneNumberFormHandle, Props>(
	({ setIsTokenVerified, isTokenVerification, onSubmitSuccess }, ref) => {
		const formRef = useRef<FormikProps<PhoneNumberForm>>(null);
		const verificationState = useAppSelector(s => s.verification);
		const user = useAppSelector(s => s.user);
		const dispatch = useAppDispatch();

		const { mutateAsync: postUpdateKyc } = usePostUpdateKyc();
		const { mutateAsync: postResendKycCode } = usePostResendKycCode();
		const { mutateAsync: postValidateKycCode } = usePostValidateKycCode();

		useImperativeHandle(ref, () => ({
			submitForm: () => {
				if (formRef.current) {
					formRef.current.submitForm();
				}
			}
		}));

		const handleComplete = async (code: string) => {
			try {
				dispatch(
					updateVerification({
						isLoading: true
					})
				);
				const res = await postValidateKycCode({
					userId: user.userId,
					code
				});
				if (res?.message) {
					dispatch(
						updateVerification({
							isPhoneNumberVerified: true
						})
					);
					toast.success(res.message);
					setIsTokenVerified(true);
				}
			} catch (error: any) {
				toast.error(error.response.data.error);
			} finally {
				dispatch(
					updateVerification({
						isLoading: false
					})
				);
			}
		};

		const onClickResendOtp = async () => {
			if (verificationState.resendCodeCountdown > 0) return;
			try {
				dispatch(
					updateVerification({
						isLoading: true
					})
				);
				const res = await postResendKycCode({
					userId: user.userId!,
					phoneNumber: verificationState.phoneNumber
				});
				if (res?.message) {
					dispatch(
						updateVerification({
							resendCodeCountdown: 60
						})
					);
					toast.success('An otp was sent to your phone number');
				}
			} catch (error: any) {
				toast.error(error.response.data.error);
			} finally {
				dispatch(
					updateVerification({
						isLoading: false
					})
				);
			}
		};

		const initialValues: PhoneNumberForm = {
			phoneNumber: verificationState.phoneNumber
		};

		const validationSchema = Yup.object().shape({
			phoneNumber: Yup.string().required("Phone number is required").min(10).max(14)
		});

		const handleSubmit = async (values: PhoneNumberForm) => {
			try {
				dispatch(
					updateVerification({
						isLoading: true
					})
				);
				const res = await postUpdateKyc({
					userId: user.userId,
					phoneNumber: values.phoneNumber
				});
				if (res?.data?._id) {
					dispatch(
						updateVerification({
							_id: res.data._id,
							isPhoneNumberVerified: res.data.isPhoneNumberVerified,
              resendCodeCountdown: 60
						})
					);
					// toast.success('An otp was sent to your phone number');
					onSubmitSuccess();
				}
			} catch (error: any) {
				toast.error(error.response.data.error);
			} finally {
				dispatch(
					updateVerification({
						isLoading: false
					})
				);
			}
		};

		return (
			<div className={styles.container}>
				{!isTokenVerification ? (
					<>
						<HeaderSubText
							title="Verify your phone number"
							description="We use this to notify you of information relating to your rentals. We will not use your number for promotions. This number can be changed later on the dashboard"
						/>

						<Formik
							innerRef={formRef}
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
							enableReinitialize
						>
							{({ errors, touched, isSubmitting }) => (
								<>
									<div className={styles.field}>
										<Field name="phoneNumber">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Phone number"
													placeholder="Enter phone number"
													className={styles.input}
													onChange={e => {
														dispatch(
															updateVerification({
																phoneNumber:
																	e.target.value
															})
														);
														field.onChange(e);
													}}
													error={
														(touched.phoneNumber &&
															errors.phoneNumber) ||
														""
													}
												/>
											)}
										</Field>
									</div>
									<RevealDetails
										question="Why is this needed?"
										answer="We use this to notify you of information relating to your rentals. We will not use your number for promotions. The phone number can be changed in your Dashboard later."
									/>
								</>
							)}
						</Formik>
					</>
				) : (
					<>
						<HeaderSubText
							title="You’ve got an SMS!"
							description={`Type the code you received via SMS on ${verificationState.phoneNumber}`}
						/>
						<ConfirmToken length={6} onComplete={handleComplete} />
						<p className={styles.resend_token} onClick={onClickResendOtp}>
							Resend code (
							<Countdown
								start={verificationState.resendCodeCountdown}
								setValue={value =>
									dispatch(
										updateVerification({ resendCodeCountdown: value })
									)
								}
							/>
							)
						</p>
					</>
				)}
			</div>
		);
	}
);

export default PhoneVerification;
PhoneVerification.displayName = "PhoneVerification";
