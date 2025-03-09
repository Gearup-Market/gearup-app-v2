import React from "react";
import styles from "./NoListings.module.scss";
import Image from "next/image";
import { GridAddIcon } from "@mui/x-data-grid";
import { Button } from "@/shared";
import Link from "next/link";

interface Props {
	showCreateButton?: boolean;
	description?: string;
	type?: string;
}

const NoListings = ({
	showCreateButton = true,
	description = "No Public Listing Found!",
	type = "listings"
}: Props) => {
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
			<p className={styles.no_transaction_text}>{description}</p>
			<div className={styles.create_listing_container}>
				{showCreateButton && (
					<Link href={type === "listings" ? "/new-listing" : "/course-listing"}>
						<Button>
							<GridAddIcon className={styles.add_icon} /> Create a listing
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default NoListings;
