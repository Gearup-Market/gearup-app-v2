"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./Authentication.module.scss";
import { Button, InputField, LoadingSpinner, Logo } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/contexts/AppContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/configureStore";
import { updateUser } from "@/store/slices/userSlice";
import { parseJwt, useAuth } from "@/contexts/AuthContext";
import { usePostUserSignIn } from "@/app/api/hooks/users";
import toast from "react-hot-toast";
import { setAuthToken } from "@/utils/tokenStorage";

// Validation schema using Yup
const loginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email format").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const initialValues = {
	email: "",
	password: "",
};

const LoginView = () => {
	const router = useRouter();
	const { setIsLoggedIn } = useGlobalContext();
	const dispatch = useAppDispatch();
	const { mutateAsync: postSignIn, isPending, data, isSuccess, status } = usePostUserSignIn();
	const searchParams = useSearchParams();
	const returnUrl = searchParams.get("returnUrl") || "/user/dashboard";

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			await postSignIn({ email: values.email, password: values.password });
			if(isSuccess){
				toast.success("Login successful");
				const parsedToken = parseJwt(data?.data?.token);
				setIsLoggedIn(true);
				setAuthToken(parsedToken);
				dispatch(updateUser(data?.data?.user));
				router.push(returnUrl);
			}else{
				toast.error("Something went wrong, please try again");
			}
		} catch (error:any) {
			toast.error(error.response.data.message || "Login failed");	
		}
	};

	return (
		<div className={styles.row}>
			<div className={styles.logo_section}>
				<div>
					<Logo className={styles.logo} />
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
					<h3>Welcome back!</h3>
					<p>
						Rent, buy and sell gears and studio spaces or{" "}
						<Link href="/signup">Sign up</Link> if you don’t have an account
					</p>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<div className={styles.input_block}>
								<Field name="email">
									{({ field }: FieldProps) => (
										<InputField
											{...field}
											label="Email address"
											placeholder="Enter email address"
											className={styles.input}
											error={(touched.email && errors.email) || ""}
										/>
									)}
								</Field>
								<Field name="password">
									{({ field }: FieldProps) => (
										<InputField
											{...field}
											label="Password"
											placeholder="Enter Password"
											isPassword
											className={styles.input}
											error={
												(touched.password && errors.password) ||
												""
											}
										/>
									)}
								</Field>
							</div>
							<div className={styles.text}>
								<p>
									Forgot your password?{" "}
									<Link
										href="/forgot-password"
										style={{ textDecoration: "none" }}
									>
										Reset it here
									</Link>
								</p>
							</div>
							<Button
								type="submit"
								className={styles.button}
								disabled={isSubmitting}
							>
								{isSubmitting ? <LoadingSpinner size="small" /> : "Login"}
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default LoginView;
