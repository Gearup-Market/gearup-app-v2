"use client";

import React from "react";
import styles from "./Authentication.module.scss";
import { Button, InputField, Logo } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/configureStore";
import { updateUser } from "@/store/slices/userSlice";

const LoginView = () => {
	const router = useRouter();
	const { setIsLoggedIn } = useGlobalContext();
	const dispatch = useAppDispatch();

	const signIn = () => {
		dispatch(updateUser({ isAuthenticated: true }));
		router.push("/");
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
					<h3>Welcome back!</h3>
					<p>
						Rent, buy and sell gears and studio spaces or{" "}
						<Link href="/signup">Sign up</Link> if you don’t have an account
					</p>
				</div>
				<div className={styles.input_block}>
					<InputField
						label="Email address"
						placeholder="Enter email address"
						className={styles.input}
					/>
					<InputField
						label="Password"
						placeholder="Enter Password"
						isPassword
						className={styles.input}
					/>
				</div>
				<div className={styles.text}>
					<p>
						Forgot your password?{" "}
						<Link href="/forgot-password" style={{ textDecoration: "none" }}>
							Reset it here
						</Link>
					</p>
				</div>
				<Button className={styles.button} onClick={signIn}>
					Login
				</Button>
			</div>
		</div>
	);
};

export default LoginView;
