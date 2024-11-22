import React from "react";
import styles from "./Authentication.module.scss";
import { Button, Logo } from "@/shared";
import Image from "next/image";
import Link from "next/link";

const PasswordResetView = () => {
	return (
		<section className={styles.section}>
			<Link href="/login">
				<Logo className={styles.logo} />
				<Logo className={styles.logo_mob} type="dark" />
			</Link>
			<div className={styles.container}>
				<div className={styles.image}>
					<Image src="/svgs/verified.svg" alt="" fill sizes="100vw" />
				</div>
				<div className={styles.text}>
					<h3>Your password has been reset!</h3>
					<p>
						This is the password you should enter when next you’re logging in
						to your gearup dashboard
					</p>
				</div>
				<Button className={styles.button} style={{ marginBottom: 0 }}>
					<Link href="/login">Login</Link>
				</Button>
				<Button className={styles.button} buttonType="secondary">
					<Link href="/">Back to homepage</Link>
				</Button>
			</div>
		</section>
	);
};

export default PasswordResetView;
