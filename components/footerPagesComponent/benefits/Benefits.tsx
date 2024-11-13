import React from "react";
import styles from "./Benefits.module.scss";
import { Title } from "@/shared";
import Image from "next/image";

export interface Benefit {
	icon: string;
	subTitle: string;
	title: string;
	description: string;
	image?: string;
	backgroundColor: string;
	lineColor: string;
}

interface Props {
	cards: Benefit[];
	title: string;
	description: string;
}

const Benefits = ({ cards, title, description }: Props) => {
	return (
		<section className={styles.section}>
			<Title
				title={title}
				description={description}
				className={styles.title}
				titleClassName={styles.small_title}
			/>
			<div className={styles.cards_section}>
				{cards.map((card, index) => (
					<div
						className={styles.card}
						key={index}
						style={{ backgroundColor: card.backgroundColor }}
					>
						<div
							className={styles.alert_container}
							data-animation="alert"
							style={{ borderColor: card.lineColor }}
						>
							<div className={styles.icon}>
								<Image src={card.icon} alt="" fill sizes="100vw" />
							</div>
							<div className={styles.text}>
								<h3>{card.subTitle}</h3>
							</div>
						</div>
						<div className={styles.card_title}>
							<div className={styles.text}>
								<h2>{card.title}</h2>
								<p>{card.description}</p>
							</div>
						</div>
						{card.image && (
							<div className={styles.image_container}>
								<div className={styles.image}>
									<Image src={card.image} alt="" fill sizes="100vw" />
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default Benefits;
