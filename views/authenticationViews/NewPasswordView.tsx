import React from "react";
import styles from "./Authentication.module.scss";
import { Button, InputField, Logo } from "@/shared";
import Link from "next/link";

const NewPasswordView = () => {
	return (
		<section className={styles.section}>
			<Link href="/login">
				<Logo className={styles.logo} />
				<Logo className={styles.logo_mob} type="dark" />
			</Link>
			<div className={styles.container}>
				<div className={styles.text}>
					<h3>New password</h3>
					<p>Enter your new password and confirm</p>
				</div>
				<InputField
					label="Password"
					placeholder="Password (Min. of 8 characters)"
					isPassword
					className={styles.input}
				/>
				<InputField
					label="Confirm password"
					placeholder="Repeat password"
					isPassword
					className={styles.input}
				/>
				<Button className={styles.button}>Create new password</Button>
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

export default NewPasswordView;
