"use client";

import React from "react";
import styles from "./Listings.module.scss";
<<<<<<< HEAD
// import { Listings } from "@/interfaces";
=======
import { Listings } from "@/interfaces";
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
import { Button, Listing, Title } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/contexts/AppContext";
<<<<<<< HEAD
import { AppState, useAppSelector } from "@/store/configureStore";

const Listings = () => {
	const listings = useAppSelector((state: AppState) => state.listings);
=======

const Listings = () => {
	const { listings }: any = useGlobalContext();
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
<<<<<<< HEAD
				{listings.slice(0, 6).map((listing: any, index: number) => (
=======
				{listings.slice(0, 6).map((listing: Listings, index: number) => (
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
