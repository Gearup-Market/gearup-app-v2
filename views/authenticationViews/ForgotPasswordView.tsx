"use client";
import React, { useState } from "react";
import styles from "./Authentication.module.scss";
import { Button, InputField, LoadingSpinner, Logo } from "@/shared";
import Link from "next/link";
import { useResetPasswordRequest } from "@/app/api/hooks/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/configureStore";
import { updateUser } from "@/store/slices/userSlice";
import * as Yup from "yup";

const schema = {
	email: Yup.string().email("Invalid email format").required("Email is required")
};

const ForgotPasswordView = () => {
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState<any>({});
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		mutateAsync: postResetPassword,
		isPending,
		data,
		isSuccess
	} = useResetPasswordRequest();

	const onSubmit = async () => {
		const validateFormData = async () => {
			const validationSchema = Yup.object().shape(schema);

			try {
				await validationSchema?.validate({ email }, { abortEarly: false });
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
		const isValid = await validateFormData();
		if (!isValid) {
			return;
		}
		try {
			const res = await postResetPassword({ email });
			if (isSuccess) {
				toast.success("Verification code sent successfully");
			}
			dispatch(updateUser({ email }));
			router.push("/reset");
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
					<h3>Forgot password</h3>
				</div>
				<InputField
					label="Email address"
					placeholder="Enter email address"
					className={styles.input}
					value={email}
					type="email"
					onChange={e => setEmail(e.target.value)}
					error={errors.email}
				/>
				<Button className={styles.button} onClick={onSubmit}>
					{isPending ? (
						<LoadingSpinner size="small" />
					) : (
						"Send verification code"
					)}
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

export default ForgotPasswordView;
