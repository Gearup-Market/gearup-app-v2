import React from "react";
import styles from "./SecondaryHero.module.scss";

interface Props {
	title: string;
	description: string;
	smallTitle?: string;
}

const SecondaryHero = ({ title, description, smallTitle }: Props) => {
	return (
		<div className={styles.hero}>
			<div className={styles.title}>
				{smallTitle && <h3>{smallTitle}</h3>}
				{title && <h1>{title}</h1>}
				{description && <p>{description}</p>}
			</div>
		</div>
	);
};

export default SecondaryHero;
