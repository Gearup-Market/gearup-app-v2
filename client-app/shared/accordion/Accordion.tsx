"use client";

import React, { useState } from "react";
import styles from "./Accordion.module.scss";
import Image from "next/image";

interface AccordionProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

const Accordion = ({ title, children, className }: AccordionProps) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	return (
		<div
			className={`${styles.accordion} ${className && className}`}
			data-active={isActive}
		>
			<div className={styles.header} onClick={() => setIsActive(!isActive)}>
				<div className={styles.text}>
					<p>{title}</p>
				</div>
				<div className={styles.chevron}>
					<Image src="/svgs/chevron.svg" alt="" fill sizes="100vw" />
				</div>
			</div>
			<div className={styles.body}>{children}</div>
		</div>
	);
};

export default Accordion;
