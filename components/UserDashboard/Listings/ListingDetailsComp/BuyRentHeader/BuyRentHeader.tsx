"use client";

import React from "react";
import styles from "./BuyRentHeader.module.scss";
import { Button, ToggleSwitch } from "@/shared";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { Listing } from "@/store/slices/listingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
	usePostChangeListingStatus,
	usePostRemoveListing
} from "@/app/api/hooks/listings";

const BuyRentHeader = ({ listing }: { listing: Listing }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { userId } = useAppSelector(s => s.user);
	const { status } = listing;

	const { mutateAsync: postRemoveListing, isPending: isPendingRemoval } =
		usePostRemoveListing();
	const { mutateAsync: postChangeListingStatus, isPending: isPendingUpdate } =
		usePostChangeListingStatus();

	const onToggleHideListing = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (status === "unavailable")
			return toast.error("This listing has not been approved yet");
		try {
			const res = await postChangeListingStatus({
				userId,
				listingId: listing._id
			});
			if (res.data) {
				toast.success("Status updated");
				window.location.reload();
			}
		} catch (error) {}
	};

	const onHandleDeleteListing = async () => {
		try {
			const payload = { userId, listingId: listing._id };
			const res = await postRemoveListing(payload);
			if (res.data) {
				toast.success("Listing deleted");
				window.location.reload();
			}
		} catch (error) {}
	};

	const onClickEdit = () => {
		const payload = {
			...listing,
			items: [{ name: listing.productName, quantity: 1, id: 0 }],
			fieldValues: [],
			tempPhotos: [],
			userId
		};

		dispatch(updateNewListing(payload));
		router.push(`/new-listing?id=${listing._id}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<HeaderSubText title="Details" />
				<div className={styles.toggle_container_mobile}>
					<ToggleListing
						checked={status === "unavailable"}
						onChange={onToggleHideListing}
						disabled={isPendingUpdate}
					/>
				</div>
			</div>
			<div className={styles.actions_btns}>
				<div className={styles.toggle_container_desktop}>
					<ToggleListing
						checked={status === "unavailable"}
						onChange={onToggleHideListing}
						disabled={isPendingUpdate}
					/>
				</div>
				<div className={styles.btns}>
					<Button
						iconPrefix="/svgs/trash.svg"
						buttonType="transparent"
						className={styles.delete_btn}
						onClick={onHandleDeleteListing}
						disabled={isPendingRemoval}
					>
						Delete
					</Button>
					<Button iconPrefix="/svgs/edit.svg" onClick={onClickEdit}>
						Edit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BuyRentHeader;

type ToggleProps = {
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
};
const ToggleListing = ({ checked, onChange, disabled }: ToggleProps) => {
	return (
		<>
			<p>Hide listing</p>
			<ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
		</>
	);
};
