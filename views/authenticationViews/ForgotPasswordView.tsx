"use client";
import React, { useState } from "react";
import styles from "./Authentication.module.scss";
import { Button, InputField, LoadingSpinner, Logo } from "@/shared";
import Link from "next/link";
import { useResetPasswordRequest } from "@/app/api/hooks/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ForgotPasswordView = () => {
	const [email, setEmail] = useState("");
	const router = useRouter();
	const { mutateAsync: postResetPassword , isPending, data, isSuccess} = useResetPasswordRequest();

	const onSubmit = async () => {
		try {
		const res=	await postResetPassword({ email });
		console.log(res,"res");
		console.log(data,"dta");
			if(isSuccess){
				toast.success("Verification code sent successfully");
			}
			router.push("/reset");
		} catch (error:any) {
			console.log(error,"error");
			toast.error(error?.response?.data?.message || "Something went wrong, please try again");
		}
	};

	return (
		<section className={styles.section}>
			<Logo className={styles.logo} />
			<Logo className={styles.logo_mob} type="dark" />
			<div className={styles.container}>
				<div className={styles.text}>
					<h3>Forgot password</h3>
				</div>
				<InputField
					label="Email address"
					placeholder="Enter email address"
					className={styles.input}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button className={styles.button} onClick={onSubmit}>
					{isPending ?  <LoadingSpinner size="small" /> : "Send verification code"}
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
