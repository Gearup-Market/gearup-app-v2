"use client";

import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import styles from "./Authentication.module.scss";
import { Button, InputField, LoadingSpinner, Logo } from "@/shared";
import Link from "next/link";
import { useResetPassword } from "@/app/api/hooks/users";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/configureStore";

const schema = {
	password: Yup.string().required("New password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Password do not match")
		.required("Please confirm your password"),
	otp: Yup.string().required("OTP is required")
};

interface ResetData {
	password: string;
	confirmPassword: string;
	otp: string;
}

const initialData = {
	password: "",
	confirmPassword: "",
	otp: ""
};

const ResetView = () => {
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	const [resetData, setResetData] = useState<ResetData>(initialData);
	const [errors, setErrors] = useState<any>({});
	const user = useAppSelector(s => s.user);
	const router = useRouter();
	const {
		mutateAsync: postResetPassword,
		isPending,
		data,
		isSuccess
	} = useResetPassword();

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setResetData({ ...resetData, [name]: value });
	};

	const onSubmit = async () => {
		const validateFormData = async (data: ResetData) => {
			const validationSchema = Yup.object().shape(schema);

			try {
				await validationSchema?.validate(data, { abortEarly: false });
				return true;
			} catch (validationErrors: any) {
				const formattedErrors = validationErrors.inner.reduce(
					(acc: any, curr: any) => ({
						...acc,
						[curr.path]: curr.message
					}),
					{}
				);
				setErrors(formattedErrors);
				return false;
			}
		};

		setErrors({});
		const isValid = await validateFormData(resetData);
		if (!isValid) {
			return;
		}

		try {
			const res = await postResetPassword({
				email: user.email,
				token: resetData.otp,
				newPassword: resetData.confirmPassword
			});
			if (isSuccess) {
				toast.success("Password reset successfully");
			}
			router.push("/password-reset");
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message || "Something went wrong, please try again"
			);
		}
	};

	return (
		<section className={styles.section}>
			<Link href="/login">
				<Logo className={styles.logo} />
				<Logo className={styles.logo_mob} type="dark" />
			</Link>
			<div className={styles.container}>
				<div className={styles.text}>
					<h3>Reset password</h3>
					<p>
						A code has been sent to {user.email}, Enter your new password and
						confirm
					</p>
				</div>
				<InputField
					label="OTP"
					placeholder="Enter OTP sent to your email"
					className={styles.input}
					value={resetData.otp}
					onChange={handleChange}
					name="otp"
					error={errors.otp}
				/>
				<InputField
					label="New Password"
					placeholder="Enter New Password"
					className={styles.input}
					value={resetData.password}
					onChange={handleChange}
					name="password"
					error={errors.password}
				/>
				<InputField
					label="Confirm Password"
					placeholder="Confirm Password"
					className={styles.input}
					value={resetData.confirmPassword}
					onChange={handleChange}
					name="confirmPassword"
					error={errors.confirmPassword}
				/>
				<Button className={styles.button} onClick={onSubmit} disabled={isPending}>
					{isPending ? <LoadingSpinner size="small" /> : "Proceed"}
				</Button>
				<div className={styles.text}>
					<p>
						Remembered your password?{" "}
						<Link href="/login" style={{ textDecoration: "none" }}>
							Login
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default ResetView;
