"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import styles from "./SearchListingsView.module.scss";
import { ListingType } from "@/interfaces";
import { Button, Listing, NoSearchResult, Pagination } from "@/shared";
import { usePathname, useRouter } from "next/navigation";
import { BreadCrumbSelect, Filter } from "@/components/listings";
import { PageLoader } from "@/shared/loaders";
import { useSearchParams } from "next/navigation";
import { AppState, useAppSelector } from "@/store/configureStore";
import { useListings } from "@/hooks/useListings";
import { iCategory } from "@/app/api/hooks/listings/types";
import { useGetCategories } from "@/app/api/hooks/listings";

const pageSize: number = 12;
const SearchListingsView = () => {
	const { data: categories, isFetching: isFetchingCategories } = useGetCategories();

	const { searchedListings, listings } = useAppSelector(
		(state: AppState) => state.listings
	);
	const router = useRouter();
	const search = useSearchParams();
	const typePathName = search.get("type");
	const category = search.get("category");
	const subCategory = search.get("subCategory");
	const [hideFilters, setHideFilters] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<iCategory | null>(null);
	const [selectedSubCategory, setSelectedSubCategory] = useState<iCategory | null>(
		null
	);
	const [isMobile, setIsMobile] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const elementRef: any = useRef(null);
	const pathName = usePathname();
	const listingsData = searchedListings.length > 0 ? searchedListings : listings;

	const searchParams = new URLSearchParams(window.location.search);
	const fieldsParams: Record<string, string[]> = {};

	Array.from(searchParams.entries()).forEach(([key, value]) => {
		if (key.startsWith("fields[")) {
			const fieldName = key.slice(7, -1);
			fieldsParams[fieldName] = value.split(",");
		}
	});
	const { refetch, meta } = useListings(true, currentPage, {
		category: searchParams.get("category") || undefined,
		subCategory: searchParams.get("subCategory") || undefined,
		minPrice: searchParams.get("minPrice") || undefined,
		maxPrice: searchParams.get("maxPrice") || undefined,
		type: typePathName || undefined,
		fields: Object.keys(fieldsParams).length > 0 ? fieldsParams : undefined
	});

	const checkActive = (url: string) => {
		return url === typePathName;
	};

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

	const onChangeSelectedCategory = useCallback(
		(option: iCategory) => {
			setSelectedCategory(option);
			setSelectedSubCategory(null);

			const currentParams = new URLSearchParams(search.toString());
			const type = currentParams.get("type");

			// Clear all parameters except type
			Array.from(currentParams.entries()).forEach(([key]) => {
				if (key !== "type") {
					currentParams.delete(key);
				}
			});

			// Set new category
			currentParams.set("category", option.name);

			router.push(`${pathName}?${currentParams.toString()}`);
		},
		[search, router, pathName]
	);

	const onChangeSelectedSubCategory = useCallback(
		(option: iCategory | null) => {
			setSelectedSubCategory(option);

			const currentParams = new URLSearchParams(search.toString());

			// Clear all filter-related parameters except category and type
			Array.from(currentParams.entries()).forEach(([key]) => {
				if (
					key !== "type" &&
					key !== "category" &&
					(key.startsWith("fields[") ||
						key === "minPrice" ||
						key === "maxPrice" ||
						key === "subCategory")
				) {
					currentParams.delete(key);
				}
			});

			if (option) {
				currentParams.set("subCategory", option.name);
			}

			router.push(`${pathName}?${currentParams.toString()}`);
		},
		[search, router, pathName]
	);

	const updatePage = (page: number) => {
		setCurrentPage(page);
	};
	useEffect(() => {
		const params = new URLSearchParams(search.toString());
		const queryParams = {
			category: params.get("category") || undefined,
			subCategory: params.get("subCategory") || undefined,
			minPrice: params.get("minPrice") || undefined,
			maxPrice: params.get("maxPrice") || undefined,
			type: params.get("type") || undefined,
			fields: fieldsParams
		};

		const queryString = JSON.stringify(queryParams);
		refetch();
	}, [search, refetch]);

	useEffect(() => {
		if (!categories?.data) return;

		const currentParams = new URLSearchParams(search.toString());
		const categoryParam = currentParams.get("category");
		const subCategoryParam = currentParams.get("subCategory");

		if (categoryParam) {
			const foundCategory = categories.data.find(
				c => c.name.toLowerCase() === categoryParam.toLowerCase()
			);

			if (foundCategory) {
				if (!selectedCategory || selectedCategory.id !== foundCategory.id) {
					setSelectedCategory(foundCategory);

					if (subCategoryParam) {
						const foundSubCategory = foundCategory.subCategories.find(
							sc => sc.name.toLowerCase() === subCategoryParam.toLowerCase()
						);
						if (foundSubCategory) {
							setSelectedSubCategory(foundSubCategory);
						}
					}
				}
			}
		}
	}, [categories, search]);

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
					setSelectedSubCategory={onChangeSelectedSubCategory}
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
					setSelectedSubCategory={onChangeSelectedSubCategory}
				/>
				<div className={styles.block}>
					<div className={styles.row}>
						<div className={styles.nav_button}>
							<Button
								buttonType="transparent"
								className={styles.button_container}
								onClick={() => {
									const currentParams = new URLSearchParams(
										search.toString()
									);
									currentParams.delete("type");
									router.push(`/listings?${currentParams.toString()}`);
								}}
							>
								<div
									className={styles.button}
									data-active={!typePathName}
								>
									All
								</div>
							</Button>
							<Button
								buttonType="transparent"
								className={styles.button_container}
								onClick={() => {
									const currentParams = new URLSearchParams(
										search.toString()
									);
									currentParams.set("type", "rent");
									router.push(`/listings?${currentParams.toString()}`);
								}}
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
								onClick={() => {
									const currentParams = new URLSearchParams(
										search.toString()
									);
									currentParams.set("type", "buy");
									router.push(`/listings?${currentParams.toString()}`);
								}}
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

					{listingsData.length ? (
						<>
							<div className={styles.grid} data-filter={!hideFilters}>
								{listingsData.map((listing, index: number) => (
									<Listing
										props={listing}
										className={styles.card}
										actionType={typePathName || ""}
										key={index}
									/>
								))}
							</div>
							<Pagination
								currentPage={currentPage}
								totalCount={meta?.total || 0}
								pageSize={meta?.limit || 12}
								onPageChange={(page: any) => updatePage(page)}
							/>
						</>
					) : (
						<div className={styles.empty}>
							<NoSearchResult />
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default SearchListingsView;
