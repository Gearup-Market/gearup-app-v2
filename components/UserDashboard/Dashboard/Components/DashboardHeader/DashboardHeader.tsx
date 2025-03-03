"use client";

import React, { useState } from "react";
import styles from "./DashboardHeader.module.scss";
import { Button, KycPrompt } from "@/shared";
import { useAppSelector } from "@/store/configureStore";
import Link from "next/link";
import toast from "react-hot-toast";
import { GridAddIcon } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

function greeting() {
	const timeNow = new Date().getHours();

	if (timeNow >= 5 && timeNow < 12) {
		return "Good morning";
	} else if (timeNow >= 12 && timeNow < 18) {
		return "Good afternoon";
	} else {
		return "Good evening";
	}
}

const DashboardHeader = () => {
	const router = useRouter();
	const user = useAppSelector(state => state.user);
	const [showKycPrompt, setShowKycPrompt] = useState(false);

	const handleClick = () => {
		if (user.isVerified) return router.push("/new-listing");
		setShowKycPrompt(true);
	};
	return (
		<div className={styles.container}>
			<div className={styles.container__left}>
				<h2 className={styles.container__left__welcome}>
					{greeting()} {user?.userName || "Guest"} 👋🏾
				</h2>
				<p className={styles.container__left__question}>
					What are you doing today?
				</p>
			</div>
			<div className={styles.create_listing}>
				<Button onClick={handleClick}>
					<GridAddIcon className={styles.add_icon} /> Create a Listing
				</Button>
			</div>
			<KycPrompt openModal={showKycPrompt} setOpenModal={setShowKycPrompt} />
		</div>
	);
};

export default DashboardHeader;
