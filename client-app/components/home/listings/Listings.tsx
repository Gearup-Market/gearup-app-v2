"use client";

import React from "react";
import styles from "./Listings.module.scss";
// import { Listings } from "@/interfaces";
import { Button, Listing, Title } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/contexts/AppContext";
import { AppState, useAppSelector } from "@/store/configureStore";

const Listings = () => {
	const { listings } = useAppSelector((state: AppState) => state.listings);
	return (
		<section className={styles.section}>
			<div className={styles.flex_row}>
				<Title title="Newly listed Gears" className={styles.title} />
				<Link href="/buy" className={styles.desk}>
					<Button buttonType="secondary" className={styles.button}>
						<p>See All Listings</p>
						<div className={styles.icon}>
							<Image src="/svgs/arrow.svg" fill alt="" sizes="100vw" />
						</div>
					</Button>
				</Link>
			</div>
			<div className={styles.row}>
				{listings.slice(0, 6).map((listing: any, index: number) => (
					<Listing props={listing} key={index} />
				))}
			</div>
			<Link href="#" className={styles.mob}>
				<Button buttonType="secondary" className={styles.button}>
					<p>See All Listings</p>
					<div className={styles.icon}>
						<Image src="/svgs/arrow.svg" fill alt="" sizes="100vw" />
					</div>
				</Button>
			</Link>
		</section>
	);
};

export default Listings;
