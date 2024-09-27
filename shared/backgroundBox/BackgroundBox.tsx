import React from "react";
import styles from "./BackgroundBox.module.scss";

const BackgroundBox = ({ props, className }: any) => {
	return (
		<div className={`${styles.container} ${className}`}>
			<div
				className={styles.box}
				style={{ backgroundImage: `url(${props.image})` }}
			>
				<div className={styles.overlay}></div>
				<p>{props.title}</p>
			</div>
		</div>
	);
};

export default BackgroundBox;
