"use client";

import React from "react";
import styles from "./Listings.module.scss";
import { Button, Listing, NoSearchResult, Title } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { AppState, useAppSelector } from "@/store/configureStore";
import { useListings } from "@/hooks/useListings";
import { PageLoader } from "@/shared/loaders";

const Listings = () => {
	const { isFetching } = useListings();
	const { listings } = useAppSelector((state: AppState) => state.listings);
	return (
		<section className={styles.section}>
			<div className={styles.flex_row}>
				<Title title="Newly listed Gears" className={styles.title} />
				<Link href="/listings" className={styles.desk}>
					<Button buttonType="secondary" className={styles.button}>
						<p>See All Listings</p>
						<div className={styles.icon}>
							<Image
								src="/svgs/arrow-color.svg"
								fill
								alt=""
								sizes="100vw"
							/>
						</div>
					</Button>
				</Link>
			</div>
			{!listings.length ? (
				<NoSearchResult
					title="No Listings Available"
					description="No Listings Available"
				/>
			) : (
				<div className={styles.row}>
					{listings.slice(0, 6).map((listing: any, index: number) => (
						<Listing props={listing} key={index} />
					))}
				</div>
			)}
			<Link href="/listings" className={styles.mob}>
				<Button buttonType="secondary" className={styles.button}>
					<p>See All Listings</p>
					<div className={styles.icon}>
						<Image src="/svgs/arrow-color.svg" fill alt="" sizes="100vw" />
					</div>
				</Button>
			</Link>
		</section>
	);
};

export default Listings;
