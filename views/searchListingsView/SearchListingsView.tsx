"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SearchListingsView.module.scss";
import { ListingType } from "@/interfaces";
import { Button, Listing, Pagination } from "@/shared";
import { usePathname, useRouter } from "next/navigation";
import { BreadCrumbSelect, Filter } from "@/components/listings";
import { PageLoader } from "@/shared/loaders";
import { useSearchParams } from "next/navigation";
import { AppState, useAppSelector } from "@/store/configureStore";
import { useListings } from "@/hooks/useListings";
import { iCategory } from "@/app/api/hooks/listings/types";
import { useGetCategories } from "@/app/api/hooks/listings";

const SearchListingsView = () => {
	useListings(true);
	const { data: categories } = useGetCategories();

	const { searchedListings, listings } = useAppSelector(
		(state: AppState) => state.listings
	);
	const router = useRouter();
	const search = useSearchParams();
	const pathName = search.get("type");

	const [hideFilters, setHideFilters] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<iCategory | null>(null);
	const [selectedSubCategory, setSelectedSubCategory] = useState<iCategory | null>(
		null
	);
	const [isMobile, setIsMobile] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [showOnMaps, setShowOnMaps] = useState<boolean>(false);
	const pageSize: number = 12;
	const elementRef: any = useRef(null);


	const listingsData = searchedListings.length > 0 ? searchedListings : listings;

	const filteredListings = useMemo(() => {
		if (!!selectedCategory && !!selectedSubCategory) {
			return listingsData.filter(l => {
				if (l.subCategory) return l.subCategory._id === selectedSubCategory.id;
				return l.category._id === selectedCategory.id;
			});
		} else if (!!selectedCategory) {
			return listingsData.filter(l => {
				return l.category._id === selectedCategory.id;
			});
		}

		return listingsData;
	}, [listingsData, selectedCategory, selectedSubCategory]);

	const checkActive = (url: string) => {
		return url === pathName;
	};

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return filteredListings?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, filteredListings]);

	const startNumber = (currentPage - 1) * pageSize + 1;
	const endNumber = Math.min(
		startNumber + currentTableData?.length - 1,
		filteredListings?.length
	);

	useEffect(() => {
		const windowWidth = window.innerWidth;
		if (windowWidth < 450) {
			setHideFilters(true);
		}
		const handleResize = () => {
			if (windowWidth > 450) {
				setIsMobile(false);
			} else {
				setIsMobile(true);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const onChangeSelectedCategory = (option: iCategory) => {
		setSelectedCategory(option);
		setSelectedSubCategory(null);
	};

	return (
		<section className={styles.section} data-hidden={hideFilters} ref={elementRef}>
			<div className={styles.breadcrumb_container}>
				{/* {!!category && <CustomBreadCrumb path1="categories" path2="gears" />} */}
				<BreadCrumbSelect
					className={styles.desk_breadcrumb}
					isMobile={isMobile}
					categories={categories?.data}
					selectedCategory={selectedCategory}
					selectedSubCategory={selectedSubCategory}
					setSelectedCategory={onChangeSelectedCategory}
					setSelectedSubCategory={setSelectedSubCategory}
				/>
				{/* {!!category && (
					<p>
						Showing <span className={styles.items_count}>20</span> results for{" "}
						<span className={styles.category_name}> {`"${category}"`}</span>
					</p>
				)} */}
			</div>
			<div className={styles.section_grid}>
				<Filter
					hideFilters={hideFilters}
					setHideFilters={setHideFilters}
					isMobile={isMobile}
				/>
				<div className={styles.block}>
					<div className={styles.row}>
						<div className={styles.nav_button}>
							<Button
								buttonType="transparent"
								className={styles.button_container}
								onClick={() => router.push("/rent")}
							>
								<div
									className={styles.button}
									data-active={checkActive("rent")}
								>
									Rent
								</div>
							</Button>
							<Button
								buttonType="transparent"
								className={styles.button_container}
								onClick={() => router.push("/buy")}
							>
								<div
									className={styles.button}
									data-active={checkActive("buy")}
								>
									Buy
								</div>
							</Button>
						</div>
						{/* <div className={styles.show_button}>
							<div className={styles.text}>
								<h3>Show on map</h3>
							</div>
							<label className={styles.switch}>
								<input
									type="checkbox"
									onChange={() => setShowOnMaps(!showOnMaps)}
									checked={showOnMaps}
								/>
								<span className={styles.slider}></span>
							</label>
						</div> */}
					</div>
					{currentTableData && currentTableData.length ? (
						<>
							<div className={styles.grid}>
								{currentTableData.map((listing, index: number) => (
									<Listing
										props={listing}
										className={styles.card}
										actionType={pathName || ''}
										key={index}
									/>
								))}
							</div>
							<Pagination
								currentPage={currentPage}
								totalCount={filteredListings?.length}
								pageSize={pageSize}
								onPageChange={(page: any) => setCurrentPage(page)}
								startNumber={startNumber}
								endNumber={endNumber}
							/>
						</>
					) : (
						<PageLoader />
					)}
				</div>
			</div>
		</section>
	);
};

export default SearchListingsView;
