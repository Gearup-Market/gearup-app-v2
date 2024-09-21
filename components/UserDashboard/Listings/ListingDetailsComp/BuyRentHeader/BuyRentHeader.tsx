import React from "react";
import styles from "./BuyRentHeader.module.scss";
import { Button, ToggleSwitch } from "@/shared";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import Link from "next/link";

const BuyRentHeader = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<HeaderSubText title="Details" />
				<div className={styles.toggle_container_mobile}>
					<ToggleListing />
				</div>
			</div>
			<div className={styles.actions_btns}>
				<div className={styles.toggle_container_desktop}>
					<ToggleListing />
				</div>
				<div className={styles.btns}>
					<Button
						iconPrefix="/svgs/trash.svg"
						buttonType="transparent"
						className={styles.delete_btn}
					>
						{" "}
						Delete
					</Button>
					<Link href="/new-listing">
						<Button iconPrefix="/svgs/edit.svg">Edit</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BuyRentHeader;

const ToggleListing = () => {
	return (
		<>
			<p>Hide listing</p>
			<ToggleSwitch />
		</>
	);
};
