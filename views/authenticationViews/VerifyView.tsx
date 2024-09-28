"use client";
import React from "react";
import styles from "./Authentication.module.scss";
import { Button, Logo } from "@/shared";
import Image from "next/image";
import Link from "next/link";

const VerifyView = () => {
	const openEmailClient = () => {
		window.location.href = "mailto:";
	};
	return (
		<section className={styles.section}>
			<Link href="/login">
				<Logo className={styles.logo} />
				<Logo className={styles.logo_mob} type="dark" />
			</Link>
			<div className={styles.container}>
				<div className={styles.image}>
					<Image src="/svgs/verify-email.svg" alt="" fill sizes="100vw" />
				</div>
				<div className={styles.text}>
					<h3>Verify email</h3>
					<p>
						We&apos;ve sent a verification link to your email address. Please
						check your inbox, click the link, and confirm your email to
						complete the sign-up process.
					</p>
				</div>
				<Button className={styles.button} onClick={openEmailClient}>
					Open email
				</Button>
			</div>
		</section>
	);
};

export default VerifyView;
