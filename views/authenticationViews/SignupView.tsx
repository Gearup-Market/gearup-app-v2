"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./Authentication.module.scss";
import { Button, CheckBox, InputField, LoadingSpinner, Logo } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePostUserSignUp } from "@/app/api/hooks/users";
// Validation schema using Yup
const signupSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email format").required("Email is required"),
	userName: Yup.string().required("Username is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Confirm password is required"),
	terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
	name: Yup.string().required("Name is required")
});

const initialValues = {
	email: "",
	userName: "",
	password: "",
	name: "Ezekiel",
	confirmPassword: "",
	terms: false
};

const SignupView = () => {
	const { mutateAsync: postUserSignUp, isPending } = usePostUserSignUp();
	const router = useRouter();

	const handleSubmit = async (values: any) => {
		const { email, userName, password } = values;
		try {
			await postUserSignUp({ email, userName, password });
			toast.success("Account created successfully");
			router.push("/verify");
		} catch (error: any) {
			toast.error(
				error.response.data.message ||
					"An error occurred while creating your account, please try again"
			);
		}
	};

	return (
		<div className={styles.row}>
			<div className={styles.logo_section}>
				<div>
					<Link href="/login">
						<Logo className={styles.logo} />
					</Link>
					<div className={styles.text}>
						<h1>
							The Marketplace For African Creators to Rent, Buy & Sell Gears
							& Studio Spaces
						</h1>
						<h5>
							Rent, buy, or sell gears with ease within your country. Our
							secure escrow system ensures worry-free transactions.
						</h5>
					</div>
				</div>
				<div className={styles.image}>
					<Image src="/images/login.png" alt="" fill sizes="100vw" />
				</div>
			</div>
			<div className={styles.container}>
				<Logo className={styles.logo_mob} type="dark" />
				<div className={styles.text}>
					<h3>Get started with Gearup</h3>
					<p>
						Let’s get you set up to rent, buy, and sell gears and studio
						spaces, or <Link href="/login">Sign in</Link> if you already have
						an account.
					</p>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={signupSchema}
					onSubmit={values => {
						handleSubmit(values);
					}}
				>
					{({ errors, touched, isSubmitting }) => {

						return (
							<Form>
								<div className={styles.input_block}>
									<Field name="email">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Email address"
												placeholder="Enter email address"
												className={styles.input}
												error={
													(touched.email && errors.email) || ""
												}
											/>
										)}
									</Field>

									<Field name="userName">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Username"
												placeholder="Enter Username"
												className={styles.input}
												error={
													(touched.userName &&
														errors.userName) ||
													""
												}
											/>
										)}
									</Field>
									<Field name="password">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Password"
												placeholder="Password (Min. of 8 characters)"
												isPassword
												className={styles.input}
												error={
													(touched.password &&
														errors.password) ||
													""
												}
											/>
										)}
									</Field>
									<div>
										<Field name="confirmPassword">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Confirm password"
													placeholder="Repeat password"
													isPassword
													className={styles.input}
												/>
											)}
										</Field>
										{errors.confirmPassword && (
											<p className={styles.error}>
												{errors.confirmPassword}
											</p>
										)}
									</div>
								</div>
								<div>
									<div className={styles.text}>
										<Field name="terms">
											{({ field }: FieldProps) => (
												<CheckBox
													className={styles.checkbox}
													{...field}
												/>
											)}
										</Field>
										<p
											style={{
												marginLeft: "3rem",
												fontSize: "1.4rem"
											}}
										>
											I have read, understood and I agree to Gearup{" "}
											<a
												target="_blank"
												rel="noreferrer noopener"
												href="#"
												style={{ fontSize: "1.4rem" }}
											>
												Privacy Policy
											</a>
											, and{" "}
											<a
												target="_blank"
												rel="noreferrer noopener"
												href="#"
												style={{ fontSize: "1.4rem" }}
											>
												Terms and conditions.
											</a>
										</p>
									</div>
									{errors.terms && (
										<p className={styles.error}>{errors.terms}</p>
									)}
								</div>
								<Button type="submit" className={styles.button}>
									{isPending ? (
										<LoadingSpinner size="small" />
									) : (
										"Create Account"
									)}
								</Button>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default SignupView;
