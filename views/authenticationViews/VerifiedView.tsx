"use client";
import React, { useEffect } from "react";
import styles from "./Authentication.module.scss";
import { Button, Logo } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useGetVerifyOTP } from "@/app/api/hooks/users";
import toast from "react-hot-toast";

interface Props {
	token?: string;
}

const VerifiedView = ({ token }: Props) => {
	const { isLoading, isSuccess, isError, error, status } = useGetVerifyOTP({
		otp: token as string,
	});

	useEffect(() => {
		if (isSuccess) {
			toast.success("Account verified successfully");
		} else if (isError) {
			toast.error(error?.response?.data?.message);
		}
	}, [status]);

	return (
		<section className={styles.section}>
			<Logo className={styles.logo} />
			<Logo className={styles.logo_mob} type="dark" />
			<div className={styles.container}>
				<div className={styles.image}>
					<Image src="/svgs/verified.svg" alt="" fill sizes="100vw" />
				</div>
				<div className={styles.text}>
					<h3>Welcome to Gearup!</h3>
					<p>Start renting, buying and selling gears and studio spaces 🎉</p>
				</div>
				<Button className={styles.button} disabled={isLoading}>
					<Link href="/login">Login</Link>
				</Button>
			</div>
		</section>
	);
};

export default VerifiedView;
