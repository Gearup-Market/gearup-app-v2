import React from "react";
import styles from "./NoListings.module.scss";
import Image from "next/image";
import { GridAddIcon } from "@mui/x-data-grid";
import { Button } from "@/shared";
import Link from "next/link";

const NoListings = () => {
	return (
		<div className={styles.container}>
			<div className={styles.image_container}>
				<Image
					src="/svgs/video.svg"
					alt="no-transaction"
					width={60}
					height={60}
				/>
			</div>
			<p className={styles.no_transaction_text}>No Public Listing Found!</p>
			<Link href={"/new-listing"}>
				<Button>
					<GridAddIcon className={styles.add_icon} /> Create a listing
				</Button>
			</Link>
		</div>
	);
};

export default NoListings;
