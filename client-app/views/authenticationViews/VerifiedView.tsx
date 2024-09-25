"use client";
import React, { useEffect } from "react";
import styles from "./Authentication.module.scss";
import { Button, Logo } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { useGetVerifyOTP, usePostResendOTP } from "@/app/api/hooks/users";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

interface Props {
	token?: string;
}

const VerifiedView = ({ token }: Props) => {
	const { isLoading, isSuccess, isError, error, status } = useGetVerifyOTP({
		otp: token as string
	});
	const { mutateAsync: postOTP } = usePostResendOTP();
	const searchParams = useSearchParams();
	const email = searchParams.get("email");

	useEffect(() => {
		if (isSuccess) {
			toast.success("Account verified successfully");
		} else if (isError) {
			toast.error(error?.response?.data?.message);
		}
	}, [status]);

	const handleResendOtp = async () => {
		try {
			await postOTP({ email: email as string });
			toast.success("Verification link sent successfully");
		} catch (error: any) {
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<section className={styles.section}>
			<Logo className={styles.logo} />
			<Logo className={styles.logo_mob} type="dark" />
			<div className={styles.container}>
				<div className={styles.image}>
					<Image
						src={isError ? "/svgs/ERROR-LOGO.svg" : "/svgs/verified.svg"}
						alt=""
						fill
						sizes="100vw"
					/>
				</div>
				<div className={styles.text}>
					<h3>
						{isError ? "Oops! This Link Has Expired" : "Welcome to Gearup!"}
					</h3>

					<p>
						{isError
							? "The authentication link you clicked on is no longer valid. Please request a new link to complete your signup"
							: "	Start renting, buying and selling gears and studio spaces 🎉"}
						🎉
					</p>
				</div>
				<Button className={styles.button} disabled={isLoading}>
					{isError ? (
						<p onClick={handleResendOtp}>Resend Verification link</p>
					) : (
						<Link href="/login">Login</Link>
					)}
				</Button>
			</div>
		</section>
	);
};

export default VerifiedView;
