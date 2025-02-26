"use client";
import React, { useRef, useState } from "react";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { Button, ConfirmToken, Countdown, InputField } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import {
	usePostSendOtpCode,
	usePostUpdateUser,
	usePostValidateOtpCode
} from "@/app/api/hooks/users";
import { toast } from "react-hot-toast";
import Modal from "@/shared/modals/modal/Modal";
import styles from "./VerifyPhoneNumber.module.scss";
import { useConfirmTransactionPin } from "@/app/api/hooks/settings";
import { updateUser } from "@/store/slices/userSlice";

interface Props {
	setPhoneNumber: (value: string) => void;
	phoneNumber: string;
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	disabled?: boolean;
}

type PhoneNumberForm = {
	phoneNumber: string;
};

interface PinFormValues {
	accountPin: string;
}

export interface PhoneNumberFormHandle {
	submitForm: () => void;
}

enum View {
	number = "number",
	code = "code",
	pin = "pin"
}

const VerifyPhoneNumber = ({
	openModal,
	setOpenModal,
	setPhoneNumber,
	phoneNumber,
	disabled
}: Props) => {
	const formRef = useRef<FormikProps<PhoneNumberForm>>(null);
	const user = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();
	const [view, setView] = useState<View>(View.number);
	const [countdown, setCountdown] = useState<number>(60);
	const { mutateAsync: postSendOtpCode } = usePostSendOtpCode();
	const { mutateAsync: postValidateOtpCode } = usePostValidateOtpCode();
	const { mutateAsync: confirmPin, isPending } = useConfirmTransactionPin();
	const { mutateAsync: postUpdateUser, isPending: userPending } = usePostUpdateUser();

	const handleComplete = async (code: string) => {
		try {
			const res = await postValidateOtpCode({
				userId: user.userId,
				code
			});
			if (res?.message) {
				toast.success(res.message);
				setView(View.pin);
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		} finally {
		}
	};

	const onClickResendOtp = async () => {
		if (countdown > 0) return;
		try {
			const res = await postSendOtpCode({
				userId: user.userId!,
				phoneNumber
			});
			if (res?.message) {
				setCountdown(60);
				toast.success("An otp was sent to your phone number");
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		} finally {
		}
	};

	const initialValues: PhoneNumberForm = {
		phoneNumber: ""
	};

	const validationSchema = Yup.object().shape({
		phoneNumber: Yup.string().required("Phone number is required").min(10).max(14)
	});

	const isSubmittingRef = useRef(false);

	const handleSubmit = async (values: PhoneNumberForm) => {
		try {
			const res = await postSendOtpCode({
				userId: user.userId,
				phoneNumber: values.phoneNumber
			});
			if (res?.message === "success") {
				setCountdown(60);
				setView(View.code);
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		} finally {
		}
	};

	const pinInitialValues: PinFormValues = {
		accountPin: ""
	};

	const pinValidationSchema = Yup.object().shape({
		accountPin: Yup.string()
			.required("Please enter transaction pin to continue")
			.matches(/^\d{6}$/, "Pin must be exactly 6 digits")
	});

	const pinHandleSubmit = async (
		values: PinFormValues,
		{ resetForm }: { resetForm: () => void }
	) => {
		try {
			await confirmPin({
				userId: user._id as string,
				pin: parseInt(values.accountPin)
			});
			await handleUpdate();
			resetForm();
			toast.success("Pin updated successfully");
			close();
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ??
					"Could not confirm transaction pin, try again later!!!"
			);
		}
	};

	const close = () => {
		setOpenModal(false);
	};

	const handleUpdate = async () => {
		const resp = await postUpdateUser(
			{ userId: user._id, phoneNumber },
			{
				onSuccess: value => {
					dispatch(updateUser({ ...user, phoneNumber }));
					toast.success("Profile updated successfully");
				},
				onError: () => {
					toast.error("An error occurred while updating your profile	");
				}
			}
		);
	};

	return (
		<Modal
			title="Change Phone Number"
			openModal={openModal}
			setOpenModal={setOpenModal}
			className={styles.modal}
		>
			<div className={styles.container}>
				{view === View.number ? (
					<>
						<HeaderSubText
							title="Verify your phone number"
							description="We use this to notify you of information relating to your rentals. We will not use your number for promotions."
						/>

						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({ errors, touched, isSubmitting, values }) => (
								<Form>
									<div className={styles.field}>
										<Field name="phoneNumber">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Phone number"
													placeholder="Enter phone number"
													className={styles.input}
													onChange={e => {
														setPhoneNumber(e.target.value);
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
									<Button
										type="submit"
										style={{ width: "100%" }}
										disabled={!values.phoneNumber || isSubmitting}
									>
										Request OTP
									</Button>
								</Form>
							)}
						</Formik>
					</>
				) : view === View.code ? (
					<>
						<HeaderSubText
							title="You’ve got an SMS!"
							description={`Type the code you received via SMS on ${phoneNumber}`}
						/>
						<ConfirmToken length={6} onComplete={handleComplete} />
						<p className={styles.resend_token} onClick={onClickResendOtp}>
							Resend code (
							<Countdown
								start={countdown}
								setValue={value => setCountdown(value)}
							/>
							)
						</p>
					</>
				) : (
					<div className={styles.pin_container}>
						<Formik
							initialValues={pinInitialValues}
							validationSchema={pinValidationSchema}
							onSubmit={pinHandleSubmit}
						>
							{({ isSubmitting }) => (
								<Form>
									<div className={styles.form_container}>
										<div className={styles.form_field}>
											<Field
												name="accountPin"
												as={InputField}
												placeholder="Enter transaction pin "
												isPassword
												type="number"
											/>
											<ErrorMessage
												name="accountPin"
												component="div"
												className={styles.error_message}
											/>
										</div>

										<div className={styles.submit_btn_container}>
											<Button
												buttonType="primary"
												type="submit"
												disabled={isSubmitting || disabled}
											>
												{isPending ? "Processing..." : "Proceed"}
											</Button>
										</div>

										<div className={styles.forgot_pin_container}>
											<p>
												Forgot pin?{" "}
												<span
													className={styles.contact_support}
													onClick={close}
												>
													Reset Pin
												</span>
											</p>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default VerifyPhoneNumber;
