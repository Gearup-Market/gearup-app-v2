"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ListingsView.module.scss";
import { Listings, ListingType } from "@/interfaces";
import { Button, Listing, Pagination } from "@/shared";
import { usePathname, useRouter } from "next/navigation";
import { BreadCrumbSelect, Filter } from "@/components/listings";
import { PageLoader } from "@/shared/loaders";
import { useSearchParams } from "next/navigation";
import { AppState, useAppSelector } from "@/store/configureStore";
import { useListings } from "@/hooks/useListings";
import { iCategory } from "@/app/api/hooks/listings/types";
import { useGetCategories } from "@/app/api/hooks/listings";

const ListingsView = () => {
	useListings(true);
	const { data: categories } = useGetCategories();

	const { listings } = useAppSelector((state: AppState) => state.listings);
	const pathName = usePathname();
	const router = useRouter();
	const pagePathName = pathName.split("/")[1];
	const search = useSearchParams();
	const category = search.get("category");
	const subCategory = search.get("subCategory");

	const [hideFilters, setHideFilters] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<iCategory | null>(null);
	const [selectedSubCategory, setSelectedSubCategory] = useState<iCategory | null>(
		null
	);
	const [isMobile, setIsMobile] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const pageSize: number = 12;
	const elementRef: any = useRef(null);

	const listingType = pagePathName === "buy" ? "sell" : pagePathName;

	const filteredListings = useMemo(() => {
		if (!!selectedCategory && !!selectedSubCategory) {
			return listings.filter(l => {
				if (l.subCategory)
					return (
						l.subCategory._id === selectedSubCategory.id &&
						(l.listingType === listingType ||
							l.listingType === ListingType.Both)
					);
				return (
					l.category._id === selectedCategory.id &&
					(l.listingType === listingType || l.listingType === ListingType.Both)
				);
			});
		} else if (!!selectedCategory) {
			return listings.filter(l => {
				return (
					l.category._id === selectedCategory.id &&
					(l.listingType === listingType || l.listingType === ListingType.Both)
				);
			});
		}

		return listings.filter(
			l => l.listingType === listingType || l.listingType === ListingType.Both
		);
	}, [listings, listingType, selectedCategory, selectedSubCategory]);

	const checkActive = (url: string) => {
		let isActive = url === pathName;
		return isActive;
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

	// to update the selectedCategory and selectedSubCategory from the query
	useEffect(() => {
		if (category) {
			const _category = categories?.data.find(
				c => c.name.toLowerCase() == category.toLowerCase()
			);
			if (_category) {
				setSelectedCategory(_category);
				const _subCategory = _category.subCategories.find(
					c => c.name.toLowerCase() == subCategory?.toLowerCase()
				);
				if (_subCategory) {
					setSelectedSubCategory(_subCategory);
				}
			}
		}
	}, [category, categories, subCategory]);

	const onChangeSelectedCategory = (option: iCategory) => {
		setSelectedCategory(option);
		setSelectedSubCategory(null);
	};

	// to update the query params when the selectedCategory and selectedSubCategory changes
	useEffect(() => {
		if (selectedCategory) {
			updateQueryParam("category", selectedCategory.name);
		}
		if (selectedSubCategory) {
			updateQueryParam("subCategory", selectedSubCategory.name);
		}
	}, [selectedCategory, selectedSubCategory]);

	const updateQueryParam = (key: string, value: string) => {
		const currentParams = new URLSearchParams(search.toString());
		if (key === "category") {
			currentParams.delete("subCategory");
		}
		currentParams.set(key, value);
		router.push(`${pathName}?${currentParams.toString()}`);
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
					categories={categories?.data}
					selectedCategory={selectedCategory}
					selectedSubCategory={selectedSubCategory}
					setSelectedCategory={onChangeSelectedCategory}
					setSelectedSubCategory={setSelectedSubCategory}
				/>
				<div className={styles.block}>
					<div className={styles.row}>
						<div className={styles.nav_button}>
							<Button
								buttonType="transparent"
								className={styles.button_container}
								onClick={() => router.push("/listings?type=rent")}
							>
								<div
									className={styles.button}
									data-active={checkActive("/listings?type=rent")}
								>
									Rent
								</div>
							</Button>
							<Button
								buttonType="transparent"
								className={styles.button_container}
								onClick={() => router.push("/listings?type=buy")}
							>
								<div
									className={styles.button}
									data-active={checkActive("/listings?type=buy")}
								>
									Buy
								</div>
							</Button>
						</div>
					</div>
					{currentTableData && currentTableData.length ? (
						<div className={styles.listings}>
							<div className={styles.grid}>
								{currentTableData.map((listing, index: number) => (
									<Listing
										props={listing}
										className={styles.card}
										actionType={listingType}
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
						</div>
					) : (
						<PageLoader />
					)}
				</div>
			</div>
		</section>
	);
};

export default ListingsView;
