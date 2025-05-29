"use client";

import React, { useState } from "react";
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
import ConfirmPin from "@/components/UserDashboard/Settings/components/confirmPin/ConfirmPin";
import { PageLoader } from "@/shared/loaders";

const BuyRentHeader = ({
	listing,
	isFetching,
	refetch
}: {
	listing?: Listing;
	isFetching: boolean;
	refetch: () => void;
}) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { userId } = useAppSelector(s => s.user);
	const [openModal, setOpenModal] = useState<boolean>(false);

	const { mutateAsync: postRemoveListing, isPending: isPendingRemoval } =
		usePostRemoveListing();
	const { mutateAsync: postChangeListingStatus, isPending: isPendingUpdate } =
		usePostChangeListingStatus();

	const onToggleHideListing = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (listing?.status === "unavailable")
			return toast.error("This listing has not been approved yet");
		try {
			const res = await postChangeListingStatus({
				userId,
				listingId: listing?._id
			});
			if (res.message) {
				toast.success("Status updated");
				refetch();
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};

	const onHandleDeleteListing = async () => {
		try {
			const payload = { userId, listingId: listing?._id };
			const res = await postRemoveListing(payload);
			if (res.message) {
				toast.success("Listing deleted");
				router.replace("/user/listings?type=rent");
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};

	const onClickEdit = () => {
		const {
			productName,
			description,
			category,
			subCategory,
			condition,
			offer,
			listingPhotos,
			_id,
			location,
			listingType,
			productionType
		} = listing!;
		const payload = {
			productName,
			description,
			category,
			subCategory,
			offer,
			listingPhotos,
			_id,
			location,
			listingType,
			productionType,
			...(condition ? { condition } : {}),
			items: [
				{
					name: listing?.productName || "Default Product Name",
					quantity: 1,
					id: listing?._id || 0
				}
			],
			tempPhotos: [],
			userId
		};

		dispatch(updateNewListing(payload));
		router.push(`/new-listing/listing-details`);
	};

	return (
		<div className={styles.container}>
			{isFetching ? (
				<PageLoader />
			) : (
				<>
					<div className={styles.header}>
						<HeaderSubText title="Details" />
						<div className={styles.toggle_container_mobile}>
							<ToggleListing
								checked={listing?.status === "available"}
								onChange={onToggleHideListing}
								disabled={isPendingUpdate}
							/>
						</div>
					</div>
					<div className={styles.actions_btns}>
						<div className={styles.toggle_container_desktop}>
							<ToggleListing
								checked={listing?.status === "available"}
								onChange={onToggleHideListing}
								disabled={isPendingUpdate}
							/>
						</div>
						<div className={styles.btns}>
							<Button
								iconPrefix="/svgs/trash.svg"
								buttonType="transparent"
								className={styles.delete_btn}
								onClick={() => setOpenModal(true)}
								disabled={isPendingRemoval}
							>
								Delete
							</Button>
							<Button iconPrefix="/svgs/edit.svg" onClick={onClickEdit}>
								Edit
							</Button>
						</div>
					</div>
				</>
			)}
			{openModal && (
				<ConfirmPin
					openModal={openModal}
					setOpenModal={setOpenModal}
					onSuccess={onHandleDeleteListing}
				/>
			)}
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
			<p>{!checked ? "Show listing" : "Hide listing"}</p>
			<ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
		</>
	);
};
