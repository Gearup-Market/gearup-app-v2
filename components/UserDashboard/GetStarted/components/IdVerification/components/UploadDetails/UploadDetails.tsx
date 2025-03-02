"use client";
import React from "react";
import styles from "./UploadDetails.module.scss";
import { RedoIcon, CloseIcon, TrashIcon, DocumentIcon } from "@/shared/svgs/dashboard";
import { formatNumber } from "@/utils";

interface ItemProps {
	name: string;
	size: string;
	status: string;
}

interface Props {
	item: File & { status?: string };
	removeExistingImage: (name: string) => void;
}
const UploadedDetails = ({ item, removeExistingImage }: Props) => {
	// const iconColor =
	// 	item.status === "success"
	// 		? "#40B773"
	// 		: item.status === "error"
	// 		? "#FF3729"
	// 		: "#F76039";
	return (
		<div className={styles.container}>
			<div className={styles.container__left}>
				<span className={`${styles.document} ${styles.document_icon}`}>
					<DocumentIcon color={"#F76039"} />
				</span>
				<div className={styles.name_container}>
					<p className={styles.name}>{item.name}</p>
					<p className={styles.size}>
						{formatNumber(item.size / 1000 || 0, 0)} KB
					</p>
				</div>
			</div>
			<div className={styles.container__right}>
				<div
					className={`${styles.error} ${styles.icon}`}
					onClick={() => removeExistingImage(item.name)}
				>
					<TrashIcon />
				</div>
			</div>
		</div>
	);
};

export default UploadedDetails;
