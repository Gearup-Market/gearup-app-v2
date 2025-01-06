"use client";

import React, { useEffect, useRef } from "react";
import styles from "./SecondaryHero.module.scss";
import { useGlobalContext } from "@/contexts/AppContext";

interface Props {
	title: string;
	description: string;
	smallTitle?: string;
}

const SecondaryHero = ({ title, description, smallTitle }: Props) => {
	const { setHeroHeight }: any = useGlobalContext();
	const heroRef: any = useRef(null);
	useEffect(() => {
		const heroHeight = heroRef.current?.offsetHeight;
		setHeroHeight(heroHeight);
	}, []);
	return (
		<div className={styles.hero} ref={heroRef}>
			<div className={styles.title}>
				{smallTitle && <h3>{smallTitle}</h3>}
				{title && <h1>{title}</h1>}
				{description && <p>{description}</p>}
			</div>
		</div>
	);
};

export default SecondaryHero;
