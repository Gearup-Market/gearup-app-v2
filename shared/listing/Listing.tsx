"use client";

import React from "react";
import styles from "./Listing.module.scss";
import { Listings } from "@/interfaces";
import Image from "next/image";
import { Button } from "..";
import { formatLink, shortenTitle } from "@/utils";
import Link from "next/link";
import { useGlobalContext } from "@/contexts/AppContext";

interface Props {
	props: any;
	className?: string;
}

const Listing = ({ props, className }: Props) => {
	const { setSingleListing } = useGlobalContext();
	return (
		<Link
			href={`/listings/${formatLink(props.title)}`}
			className={`${styles.container} ${className}`}
			onClick={() => setSingleListing(props)}
		>
			<div className={styles.image}>
				<Image src={props.image} alt={props.title} fill sizes="100vw" />
				<div className={styles.button_container} data-active={props.forSale}>
					{props.forSale && <Button className={styles.button}>Buy</Button>}
					{props.forRent && <Button className={styles.button}>Rent</Button>}
				</div>
			</div>
			<div className={styles.row} style={{ alignItems: "flex-start" }}>
				<div className={styles.text}>
					<h2>{shortenTitle(props.title, 50)}</h2>
				</div>
				<div className={styles.chevron}>
					<Image src="/svgs/chevron-yellow.svg" alt="" fill sizes="100vw" />
				</div>
			</div>
			<div className={styles.pricing_container}>
				{props.forRent && (
					<div className={styles.pricing}>
						<p>
							${props.price}
							<span>/Day</span>{" "}
						</p>
					</div>
				)}
				{props.forSale && (
					<div className={styles.pricing}>
						<p>${props.buyPrice}</p>
					</div>
				)}
			</div>
			<div className={styles.row}>
				<div className={styles.small_row}>
					<div className={styles.avatar}>
						<Image
<<<<<<< HEAD
							src={props.author?.image}
=======
							src={props.author.image}
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
							alt={props.user}
							fill
							sizes="100vw"
						/>
					</div>
					<div className={styles.text} style={{ marginBottom: 0 }}>
<<<<<<< HEAD
						<p>{props.author?.name}</p>
=======
						<p>{props.author.name}</p>
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
					</div>
					<div className={styles.verified}>
						<Image src="/svgs/icon-verify.svg" alt="" fill sizes="100vw" />
					</div>
				</div>
				<div className={styles.small_row}>
					<div className={styles.verified}>
						<Image
							src={`/svgs/icon-${
								props.reviews ? "filled-star" : "star"
							}.svg`}
							alt=""
							fill
							sizes="100vw"
						/>
					</div>
					<div className={styles.text} style={{ marginBottom: 0 }}>
						<span>({props.reviews ? props.reviews : 0})</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Listing;
