"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ListingsView.module.scss";
import { Listings } from "@/interfaces";
<<<<<<< HEAD
import { Button, CustomBreadCrumb, Listing, Pagination } from "@/shared";
=======
import { Button, Listing, Pagination } from "@/shared";
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
import { usePathname, useRouter } from "next/navigation";
import { BreadCrumbSelect, Filter } from "@/components/listings";
import gsap from "gsap";
import { useGlobalContext } from "@/contexts/AppContext";
import { PageLoader } from "@/shared/loaders";
import { useFetch } from "@/hooks";
<<<<<<< HEAD
import { useSearchParams } from "next/navigation";
import { AppState, useAppSelector } from "@/store/configureStore";
const ListingsView = () => {
	// const { listings, setListings }: any = useGlobalContext();
	const listings = useAppSelector((state: AppState) => state.listings);
	const pathName = usePathname();
	const router = useRouter();
	const pagePathName = pathName.split("/")[1];
	const search = useSearchParams();
	const category = search.get("category");
=======

const ListingsView = () => {
	const { listings, setListings }: any = useGlobalContext();
	const pathName = usePathname();
	const router = useRouter();
	const pagePathName = pathName.split("/")[1];
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe

	const [hideFilters, setHideFilters] = useState<boolean>(false);
	// const [listings, setListings] = useState<any[]>([]);
	const [isMobile, setIsMobile] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [showOnMaps, setShowOnMaps] = useState<boolean>(false);
	const pageSize: number = 12;
	const elementRef: any = useRef(null);
<<<<<<< HEAD
	console.log(listings);
=======
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe

	const checkActive = (url: string) => {
		let isActive = url === pathName;

		return isActive;
	};
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return listings?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, listings]);
	const startNumber = (currentPage - 1) * pageSize + 1;
	const endNumber = Math.min(
		startNumber + currentTableData?.length - 1,
		listings?.length
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
	// useEffect(() => {
	// 	const windowWidth = window.innerWidth;
	// 	const element = elementRef.current;
	// 	const sectionGrid = element.children[1];
	// 	const rowSection = sectionGrid.children[1];
	// 	const grid = rowSection.children[1];
	// 	if (windowWidth > 450) {
	// 		if (hideFilters) {
	// 			// gsap.to(grid, {
	// 			// 	gridTemplateColumns: "repeat(4, 1fr)",
	// 			// 	duration: 0.01,
	// 			// 	delay: 2,
	// 			// 	// ease: "power2.inOut",
	// 			// });
	// 			gsap.fromTo(
	// 				grid,
	// 				{
	// 					marginLeft: "30.2rem",
	// 					duration: 0.25,
	// 				},
	// 				{
	// 					marginLeft: 0,
	// 					duration: 0.25,
	// 				}
	// 			);
	// 			// gsap.to(sectionGrid, {
	// 			// 	gridTemplateColumns: "1fr",
	// 			// 	// delay: 3,
	// 			// });
	// 			gsap.to(rowSection, {
	// 				width: "100%",
	// 				duration: 0.25,
	// 				// delay: 2,
	// 				// ease: "power2.inOut",
	// 			});
	// 		} else {
	// 			// gsap.to(grid, {
	// 			// 	gridTemplateColumns: "repeat(3, 1fr)",
	// 			// 	duration: 0.01,
	// 			// 	// delay: 3,
	// 			// 	// ease: "power2.inOut",
	// 			// });
	// 			// gsap.to(sectionGrid, {
	// 			// 	gridTemplateColumns: "30.2rem 1fr",
	// 			// 	// delay: 3,
	// 			// });
	// 			gsap.to(rowSection, {
	// 				width: "calc(100% - 32.6rem)",
	// 				duration: 0.001,
	// 				// delay: 2,
	// 				// ease: "power2.inOut",
	// 			});
	// 		}
	// 	}
	// }, [hideFilters]);
	return (
		<section className={styles.section} data-hidden={hideFilters} ref={elementRef}>
<<<<<<< HEAD
			<div className={styles.breadcrumb_container}>
				{!!category && <CustomBreadCrumb path1="categories" path2="gears" />}
				<BreadCrumbSelect
					className={styles.desk_breadcrumb}
					isMobile={isMobile}
				/>
				{!!category && (
					<p>
						Showing <span className={styles.items_count}>20</span> results for{" "}
						<span className={styles.category_name}> {`"${category}"`}</span>
					</p>
				)}
			</div>
=======
			{/* <BreadCrumbSelect className={styles.desk_breadcrumb} isMobile={isMobile} /> */}
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
									data-active={checkActive("/rent")}
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
									data-active={checkActive("/buy")}
								>
									Buy
								</div>
							</Button>
						</div>
						<div className={styles.show_button}>
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
						</div>
					</div>
					{listings && listings.length ? (
						<>
							<div className={styles.grid}>
								{currentTableData?.map(
									(listing: Listings, index: number) => (
										<Listing
											props={listing}
											className={styles.card}
											key={index}
										/>
									)
								)}
							</div>
							<Pagination
								currentPage={currentPage}
								totalCount={listings?.length}
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

export default ListingsView;
