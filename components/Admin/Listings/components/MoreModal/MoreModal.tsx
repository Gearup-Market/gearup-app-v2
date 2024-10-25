"use client";
import { Switch } from "@mui/material";
import React from "react";
import styles from "./MoreModal.module.scss";
import { ToggleSwitch } from "@/shared";
import Link from "next/link";
import { useAppSelector } from "@/store/configureStore";
import {
	usePostChangeListingStatus,
	usePostRemoveListing
} from "@/app/api/hooks/listings";
import toast from "react-hot-toast";

interface MoreModalProps {
	row?: any;
	activeFilter?: string;
	onClickEdit?: (listingId: string) => void;
}

const MoreModal = ({ row, activeFilter, onClickEdit }: MoreModalProps) => {
	const { userId } = useAppSelector(s => s.user);
	
	const [checked, setChecked] = React.useState(row.status === "available");
	const { mutateAsync: postRemoveListing, isPending: isPendingRemoval } =
		usePostRemoveListing();
	const { mutateAsync: postChangeListingStatus, isPending: isPendingUpdate } =
		usePostChangeListingStatus();

	const onToggleHideListing = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setChecked(prev => !prev);
			const status = checked ? "available" : "unavailable";
			const res = await postChangeListingStatus({
				status,
				userId,
				listingId: row.id
			});
			if (res.data) {
				toast.success("Status updated");
				window.location.reload();
			}
		} catch (error) {}
	};

	const onDeleteListing = async () => {
		try {
			const payload = { userId, listingId: row.id };
			const res = await postRemoveListing(payload);
			if (res.data) {
				toast.success("Listing deleted");
				window.location.reload();
			}
		} catch (error) {}
	};
	return (
		<div className={styles.container}>
			<div className={`${styles.container__details} ${styles.item}`}>
				<Link
					href={`/admin/listings/${row.id}`}
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
						{checked ? "Live" : "Hidden"}
					</span>
				</div>
			)}
			<div
				className={`${styles.container__delete} ${styles.item}`}
				onClick={() => {
					if (isPendingRemoval) return;
					onDeleteListing();
				}}
			>
				Delete
			</div>
		</div>
	);
};

export default MoreModal;
