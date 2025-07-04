"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./Listings.module.scss";
import ListingTable from "./components/ListingTable/ListingTable";
import { ToggleSwitch } from "@/shared";
import { useRouter } from "next/navigation";
import { useAdminListingFilters, useListings } from "@/hooks/useListings";
import { ReuseableFilters } from "@/components/UserDashboard";
import HeaderSubText from "../HeaderSubText/HeaderSubText";

enum Type {
	Rent = "Rent",
	Buy = "Sell",
	Courses = "Courses"
}

interface Props {
	showTitle?: boolean;
	userid?: string;
}

const Listings = ({ showTitle, userid }: Props) => {
	// useListings();
	const [activeFilterId, setActiveFilterId] = useState<number | string>(1);
	const [activeSubFilterId, setActiveSubFilterId] = useState<number | string>(1);
	const [activeFilter, setActiveFilter] = useState<Type>(Type.Rent);
	const router = useRouter();
	const { adminParentFilters: parentFilters } = useAdminListingFilters();

	useEffect(() => {
		const activeFilter = parentFilters.find(filter => filter.id === activeFilterId);
		setActiveFilter(activeFilter?.name as Type);
	}, [activeFilterId]);

	const handleButtonClick = () => {
		if (activeFilter === Type.Courses) {
			router.push("/course-listing");
		}
		if (activeFilter === Type.Rent || activeFilter === Type.Buy) {
			router.push("/new-listing");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.title_toggle}>
				<HeaderSubText title="Listings" variant="main" />
				<div className={styles.listing_text}>
					<p>Hide All Listings</p>
					<ToggleSwitch />
				</div>
			</div>
			<div className={styles.container__filters_container}>
				{/* <ReuseableFilters
					parentFilters={parentFilters}
					activeFilterId={activeFilterId}
					setActiveFilterId={setActiveFilterId}
					setActiveSubFilterId={setActiveSubFilterId}
					activeSubFilterId={activeSubFilterId}
					showChildrenFilters={true}
				/> */}
				<div className={styles.container__filters_container__listings_container}>
					<span>
						<p>Hide All Listings</p>
						<ToggleSwitch />
					</span>
				</div>
			</div>
			<ListingTable
				activeFilter={activeFilter?.toLowerCase()}
				activeSubFilterId={activeSubFilterId}
				filters={parentFilters}
				handleAddItem={handleButtonClick}
				userid={userid}
			/>
		</div>
	);
};

export default Listings;
