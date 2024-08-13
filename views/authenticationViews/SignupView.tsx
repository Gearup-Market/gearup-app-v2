import React from "react";
import styles from "./Authentication.module.scss";
import { Button, CheckBox, InputField, Logo } from "@/shared";
import Image from "next/image";
import Link from "next/link";

const SignupView = () => {
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
							secure escrow system ensures worry-free transactions
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
						Let’s get you set up to rent, buy an sell gears and studio spaces
						or <Link href="/login">Sign in</Link> Sign in if you already have
						an account
					</p>
				</div>
				<div className={styles.input_block}>
					<InputField
						label="Email address"
						placeholder="Enter email address"
						className={styles.input}
					/>
					<InputField
						label="Username"
						placeholder="Enter Username"
						className={styles.input}
					/>
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
				</div>
				<div className={styles.text}>
					<CheckBox className={styles.checkbox} />
					<p style={{ marginLeft: "3rem", fontSize: "1.4rem" }}>
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
				<Button className={styles.button}>Create Account</Button>
			</div>
		</div>
	);
};

export default SignupView;
