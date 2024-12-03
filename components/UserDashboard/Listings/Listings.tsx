"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./Listings.module.scss";
import ListingTable from "./components/ListingTable/ListingTable";
import { Button, InputField, ToggleSwitch } from "@/shared";
import { GridAddIcon } from "@mui/x-data-grid";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import ReuseableFilters from "../ReuseableFilter/ReuseableFilter";
import { useRouter } from "next/navigation";
import { useListingFilters, useListings } from "@/hooks/useListings";
import { useAppSelector } from "@/store/configureStore";

enum Type {
	Rent = "Rent",
	Buy = "Sell",
	Courses = "Courses"
}

const Listings = () => {
	useListings();
	const [activeFilterId, setActiveFilterId] = useState<number | string>(1);
	const [activeSubFilterId, setActiveSubFilterId] = useState<number | string>(1);
	const [activeFilter, setActiveFilter] = useState<Type>(Type.Rent);
	const router = useRouter();
	const { filters: parentFilters } = useListingFilters();
	const listings = useAppSelector(s => s.listings.owned);

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
				<ReuseableFilters
					parentFilters={parentFilters}
					activeFilterId={activeFilterId}
					setActiveFilterId={setActiveFilterId}
					setActiveSubFilterId={setActiveSubFilterId}
					activeSubFilterId={activeSubFilterId}
					showChildrenFilters={!!listings.length}
				/>
				<div className={styles.container__filters_container__listings_container}>
					<span>
						<p>Hide All Listings</p>
						<ToggleSwitch />
						{!!listings.length && (
							<Button onClick={handleButtonClick}>
								{" "}
								<GridAddIcon className={styles.add_icon} />{" "}
								{activeFilter === Type.Courses
									? "New Course"
									: "Create a listing"}
							</Button>
						)}
					</span>
				</div>
			</div>
			<ListingTable
				activeFilter={activeFilter?.toLowerCase()}
				activeSubFilterId={activeSubFilterId}
				filters={parentFilters}
				handleAddItem={handleButtonClick}
			/>
		</div>
	);
};

export default Listings;
