"use client";
import React from "react";
import styles from "./ListingsDetails.module.scss";
import { BackNavigation, Button } from "@/shared";
import { HeaderSubText } from "@/components/UserDashboard";
import PersonalDetails from "../../Transactions/TransactionDetails/TransactionDetailsBody/components/PersonalDetails/PersonalDetails";
import BuyRentListing from "./components/BuyRentListing/BuyRentListing";
import CourseListing from "./components/CourseListing/CourseListing";
import { PageLoader } from "@/shared/loaders";
import { useSingleListing } from "@/hooks/useListings";
import { useAppSelector } from "@/store/configureStore";
import { useParams } from "next/navigation";
import { useFetchUserDetailsById } from "@/hooks/useUsers";
import {
	usePostApproveListing,
	usePostDeclineListing
} from "@/app/api/hooks/Admin/listings";
import toast from "react-hot-toast";

const ListingsDetails = () => {
	const listingType: string = "buy-rent";
	const { listingId } = useParams();
	const { currentListing } = useAppSelector(s => s.listings);
	const { refetch, isFetching } = useSingleListing(listingId.toString());
	const { fetchingUser, user } = useFetchUserDetailsById(
		currentListing?.user._id ?? ""
	);

	const { mutateAsync: postApproveListing, isPending: isPendingApprove } =
		usePostApproveListing();

	const { mutateAsync: postDeclineListing, isPending: isPendingDecline } =
		usePostDeclineListing();

	const onToggleHideListing = async (type: "approve" | "decline") => {
		try {
			if (type === "approve") {
				const res = await postApproveListing({
					listingId: currentListing?._id
				});
				if (res) {
					toast.success("Listing approved");
					refetch();
				}
			} else {
				const res = await postDeclineListing({
					listingId: currentListing?._id
				});
				if (res) {
					toast.success("Listing declined");
					refetch();
				}
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};

	if (!currentListing && isFetching) return <PageLoader />;
	if (!currentListing) return null;

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<BackNavigation />
				<HeaderSubText title={currentListing?.status} variant="normal" />
			</div>
			<div className={styles.header_container}>
				<HeaderSubText title="Review listing" variant="main" />
				<div className={styles.btn_container}>
					<Button
						className={styles.decline_btn}
						onClick={() => onToggleHideListing("decline")}
						disabled={isPendingDecline}
					>
						Decline
					</Button>
					<Button
						className={styles.accept_btn}
						onClick={() => onToggleHideListing("approve")}
						disabled={isPendingApprove}
					>
						Approve
					</Button>
				</div>
			</div>
			<main className={styles.main_container}>
				<div className={styles.left_container}>
					{listingType === "courses" ? (
						<CourseListing />
					) : (
						<>
							<BuyRentListing listing={currentListing} />
						</>
					)}
				</div>
				<div className={styles.right_container}>
					<PersonalDetails
						profileLink={`/admin/users/${user?.userId}`}
						title="Merchant"
						name={user?.userName}
						subText={user?.address || "Nigeria"}
					/>
				</div>
			</main>
			<div className={styles.btn_container_mob}>
				<Button
					className={styles.decline_btn}
					onClick={() => onToggleHideListing("decline")}
					disabled={isPendingDecline}
				>
					Decline
				</Button>
				<Button
					className={styles.accept_btn}
					onClick={() => onToggleHideListing("approve")}
					disabled={isPendingApprove}
				>
					Approve
				</Button>
			</div>
		</div>
	);
};

export default ListingsDetails;
