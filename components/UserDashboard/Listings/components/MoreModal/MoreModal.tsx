"use client";
import React, { useState } from "react";
import styles from "./MoreModal.module.scss";
import { ToggleSwitch } from "@/shared";
import Link from "next/link";
import { useAppSelector } from "@/store/configureStore";
import {
	usePostChangeUserListingStatus,
	usePostRemoveListing
} from "@/app/api/hooks/listings";
import toast from "react-hot-toast";
import ConfirmPin from "@/components/UserDashboard/Settings/components/confirmPin/ConfirmPin";

interface MoreModalProps {
	row?: any;
	activeFilter?: string;
	onClickEdit?: (listingId: string) => void;
	refetch?: () => void;
	closePopOver?: () => void;
}

const MoreModal = ({
	row,
	activeFilter,
	onClickEdit,
	refetch,
	closePopOver
}: MoreModalProps) => {
	const { userId } = useAppSelector(s => s.user);
	const { mutateAsync: postRemoveListing, isPending: isPendingRemoval } =
		usePostRemoveListing();
	const { mutateAsync: postChangeListingStatus, isPending: isPendingUpdate } =
		usePostChangeUserListingStatus();

	const onToggleHideListing = async () => {
		if (row.status === "unavailable")
			return toast.error("This listing has not been approved yet");
		try {
			const res = await postChangeListingStatus({
				userId,
				listingId: row.id
			});
			if (res.message === "Listing visibility updated successfully") {
				toast.success("Status updated");
				refetch!();
				closePopOver!();
			}
		} catch (error) {}
	};

	const onDeleteListing = async () => {
		try {
			const payload = { userId, listingId: row.id };
			const res = await postRemoveListing(payload);
			if (res.data) {
				toast.success("Listing deleted");
				refetch!();
				closePopOver!();
			}
		} catch (error) {}
	};
	return (
		<div className={styles.container}>
			<div className={`${styles.container__details} ${styles.item}`}>
				<Link
					href={`/user/listings/${row.id}`}
					className={`${styles.container__details}`}
				>
					View Details
				</Link>
			</div>
			<div
				className={`${styles.container__edit} ${styles.item}`}
				onClick={() => onClickEdit?.(row.id)}
			>
				Edit
			</div>
			{activeFilter === "courses" ? (
				<div className={`${styles.container__edit} ${styles.item}`}>Share</div>
			) : (
				<div className={`${styles.container__status_container} ${styles.item}`}>
					<span className={styles.status}>Status</span>
					<span className={styles.switch}>
						<ToggleSwitch
							onChange={onToggleHideListing}
							checked={row.status.toLowerCase() === "available"}
							disabled={isPendingUpdate}
						/>
						{row.status.toLowerCase() === "available" ? "Live" : "Draft"}
					</span>
				</div>
			)}
			{/* <div
				className={`${styles.container__delete} ${styles.item}`}
				onClick={() => handleDelete(row.id)}
			>
				Delete
			</div> */}
		</div>
	);
};

export default MoreModal;
