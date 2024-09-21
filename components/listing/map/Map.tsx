import React from "react";
import styles from "./Map.module.scss";
import Image from "next/image";
import { Listing } from "@/store/slices/listingsSlice";

const Map = ({ location }: { location: Listing['location'] }) => {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<h3>LOCATION</h3>
			</div>
			<div className={styles.image}>
				<Image src="/images/map.png" fill alt="" sizes="100vw" />
			</div>
			<div className={styles.text}>
				<p>{location.city}</p>
			</div>
		</div>
	);
};

export default Map;
