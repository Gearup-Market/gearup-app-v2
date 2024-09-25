import React from "react";
import styles from "./ModalLoader.module.scss";

const ModalLoader: React.FC = () => {
	const circleSizes = [6, 5, 4, 3, 2, 1];
	return (
		<div className={styles.loader}>
			<div className={styles.animatedLine}>
				{circleSizes.map((size, index) => (
					<div
						key={index}
						className={`${styles.circle} ${styles[`size${size}`]}`}
					></div>
				))}
			</div>
		</div>
	);
};

export default ModalLoader;
