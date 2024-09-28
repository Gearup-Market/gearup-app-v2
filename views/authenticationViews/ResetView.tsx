"use client";

import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import styles from "./Authentication.module.scss";
import { Button, InputField, Logo } from "@/shared";
import Link from "next/link";

const ResetView = () => {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const handleChange = (index: number, value: string) => {
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		if (value !== "" && index < otp.length - 1 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			e.key === "Backspace" &&
			index > 0 &&
			otp[index] === "" &&
			inputRefs.current[index - 1]
		) {
			inputRefs.current[index - 1]?.focus();
		}
	};
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
		const newOtp = pastedData.split("").slice(0, 6);
		setOtp(newOtp);
		if (inputRefs.current[5]) {
			inputRefs.current[5].focus();
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
					<p>A code has been sent to your Einstein***@gmail.com</p>
				</div>
				<div className={styles.otp_container}>
					{otp.map((value, index) => (
						<input
							key={index}
							type="number"
							className={styles.otp_input}
							value={value}
							max={9}
							onPaste={handlePaste}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleChange(index, e.target.value)
							}
							onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
								handleKeyDown(index, e)
							}
							maxLength={1}
							ref={el => {
								inputRefs.current[index] = el;
							}}
						/>
					))}
				</div>
				<Button className={styles.button}>Proceed</Button>
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
