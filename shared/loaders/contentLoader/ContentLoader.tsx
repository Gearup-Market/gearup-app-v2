import React from "react";
import styles from "./ContentLoader.module.scss";

interface Props {
	className?: string;
}

const ContentLoader = ({ className }: Props) => {
	return (
		<div className={`${styles.loader} ${className}`}>
			<div className={styles.container}></div>
			<div className={styles.container}></div>
		</div>
	);
};

export default ContentLoader;
