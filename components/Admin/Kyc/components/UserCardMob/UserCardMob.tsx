"use client";
import React, { useState } from "react";
import styles from "./UserCardMob.module.scss";
import Image from "next/image";
import { Button, MobileCard } from "@/shared";
import Link from "next/link";

interface Props {
	item: any;
	url: string;
	lastEle?: boolean;
	ind?: number;
}
const UserCardMob = ({ item, url, lastEle, ind }: Props) => {
	return (
		<MobileCard
			mainHeaderText={`${item.firstName} ${item.lastName}`}
			// subHeaderText={item.email}
			mainHeaderImage={item.avatar || "/svgs/user.svg"}
			lastEle={lastEle}
			ind={ind}
		>
			<div className={styles.container__details__detail_container}>
				<p className={styles.key}>Email</p>
				<p className={styles.value}>{item.userId.email}</p>
			</div>
			<div className={styles.container__details__detail_container}>
				<p className={styles.key}>Joined date</p>
				<p className={styles.value}>{item.createdAt.split("T")[0]}</p>
			</div>
			<div className={styles.container__details__detail_container}>
				<p className={styles.key}>Account Status</p>
				<p
					className={`${styles.value} ${styles.status}`}
					data-status={item.isActive ? "Active" : "Inactive"}
				>
					{item.isActive ? "Active" : "Inactive"}
				</p>
			</div>
			<div className={styles.container__details__btn_container}>
				<Link
					href={`/admin/${url}/${item.userId._id}`}
					className={styles.container__action_btn}
				>
					<Button buttonType="secondary" className={styles.btn}>
						see details
					</Button>
				</Link>
			</div>
		</MobileCard>
	);
};

export default UserCardMob;
