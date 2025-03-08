import React from "react";
import styles from "./NoSearchResult.module.scss";
import Image from "next/image";

interface Props {
	title?: string;
	description?: string;
}

const NoSearchResult = ({
	title = "No Search Result Found",
	description = "Your current search result is not available"
}: Props) => {
	return (
		<div className={styles.container}>
			<Image
				src="/svgs/empty-state-icon.svg"
				height={100}
				alt="empty-state-icon"
				width={100}
			/>
			<h2>{title}</h2>
			<p>{description}</p>
		</div>
	);
};

export default NoSearchResult;
