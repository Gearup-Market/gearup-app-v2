"use client";

import React, { useState } from "react";
import styles from "./Faq.module.scss";
import { Title } from "@/shared";
import { faq } from "@/mock";

const Faq = () => {
	return (
		<section className={styles.section}>
			<Title
				title="Frequently Asked Questions"
				className={styles.title}
				titleClassName={styles.title_classname}
			/>
			<div className={styles.faq_section}>
				{faq.map((item: any, index: number) => (
					<Accordion
						title={item.title}
						description={item.description}
						key={index}
					/>
				))}
			</div>
		</section>
	);
};

export default Faq;

interface AccordionProps {
	title: string;
	description: string;
}

const Accordion = ({ title, description }: AccordionProps) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	return (
		<div className={styles.accordion} data-active={isActive}>
			<div className={styles.header}>
				<div className={styles.text}>
					<h3>{title}</h3>
				</div>
				<div
					onClick={() => setIsActive(!isActive)}
					className={styles.accordion_button_container}
					data-active={isActive}
				>
					<div
						className={
							styles[
								!isActive ? "accordion_button" : "accordion_button__open"
							]
						}
					>
						<span className={styles.accordion_buttonBar}></span>
						<span className={styles.accordion_buttonBar}></span>
					</div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.text}>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
};
