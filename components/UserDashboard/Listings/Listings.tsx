"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./Listings.module.scss";
import ListingTable from "./components/ListingTable/ListingTable";
import { Button, InputField, ToggleSwitch } from "@/shared";
import { GridAddIcon } from "@mui/x-data-grid";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import ReuseableFilters from "../ReuseableFilter/ReuseableFilter";
import { useRouter } from "next/navigation";
import { useListingFilters, useListingsByUser } from "@/hooks/useListings";
import { useAppSelector } from "@/store/configureStore";
import { Filter } from "@/interfaces/Listing";
import { usePostHideAllListingStatus } from "@/app/api/hooks/listings";
import { toast } from "react-toastify";
enum Type {
	Rent = "Rent",
	Buy = "Sell",
	Courses = "Courses"
}

const Listings = () => {
	const user = useAppSelector(s => s.user);
	const {
		mutateAsync: hideAllListingStatus,
		isPending: isPendingHideAllListingStatus
	} = usePostHideAllListingStatus({ userId: user?._id as string });
	const [activeFilter, setActiveFilter] = useState<Filter>({
		id: 1,
		name: "All",
		subFilters: []
	});
	const router = useRouter();
	const { filters: parentFilters } = useListingFilters();
	const listings = useAppSelector(s => s.listings.owned);
	const courses = useAppSelector(s => s.courses.owned);
	const { refetch } = useListingsByUser();

	const isAllListingsHidden = useMemo(() => {
		return listings.every(listing => listing.status === "draft");
	}, [listings]);

	const handleHideAllListingStatus = async () => {
		try {
			const res = await hideAllListingStatus({ userId: user?._id as string });
			if (res.message) {
				toast.success("All listings status updated");
				refetch();
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};

	const handleButtonClick = () => {
		if (activeFilter.name === Type.Courses) {
			router.push("/course-listing");
		}
		if (activeFilter.name === Type.Rent || activeFilter.name === Type.Buy) {
			router.push("/new-listing");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.title_toggle}>
				<HeaderSubText title="Listings" variant="main" />
				<div className={styles.listing_text}>
					<p>Hide All Listings</p>
					<ToggleSwitch
						checked={isAllListingsHidden}
						onChange={handleHideAllListingStatus}
						disabled={isPendingHideAllListingStatus}
					/>
				</div>
			</div>
			<div className={styles.container__filters_container}>
				<ReuseableFilters
					page="listings"
					parentFilters={parentFilters}
					setActiveFilter={setActiveFilter}
					activeFilter={activeFilter}
				/>
				<div className={styles.container__filters_container__listings_container}>
					<span>
						<p>Hide All Listings</p>
						<ToggleSwitch
							checked={isAllListingsHidden}
							onChange={handleHideAllListingStatus}
							disabled={isPendingHideAllListingStatus}
						/>
						{(activeFilter.name === Type.Rent ||
							activeFilter.name === Type.Buy) &&
						listings.length ? (
							<Button onClick={handleButtonClick}>
								{" "}
								<GridAddIcon className={styles.add_icon} /> Create a
								listing
							</Button>
						) : null}
						{activeFilter.name === Type.Courses && !courses.length ? (
							<Button onClick={handleButtonClick}>
								{" "}
								<GridAddIcon className={styles.add_icon} /> New Course
							</Button>
						) : null}
					</span>
				</div>
			</div>
			{activeFilter.name !== Type.Courses && !listings.length ? (
				<Button onClick={handleButtonClick} className={styles.button}>
					<GridAddIcon className={styles.button_icon} />
				</Button>
			) : null}
			{activeFilter.name === Type.Courses && !courses.length ? (
				<Button onClick={handleButtonClick} className={styles.button}>
					<GridAddIcon className={styles.button_icon} />
				</Button>
			) : null}
			<ListingTable activeFilter={activeFilter} />
		</div>
	);
};

export default Listings;
