"use client";

import styles from "./ScrollComponent.module.scss";
import { scrollData } from "@/mock";
import Image from "next/image";
import { Button } from "@/shared";
import Link from "next/link";

const ScrollComponent = () => {
	return (
		<section
			className={styles.section}
			id="summary"
			data-nav-section="Summary"
			data-animation="scroll"
		>
			<div className={styles.row} data-animation="cards">
				{scrollData.map((card: any, index: number) => (
					<div
						className={styles.card}
						data-animation="card"
						data-active={index === 1}
						key={index}
					>
						<div className={styles.header}>
							<div className={styles.indicators}>
								{scrollData.map((item: any, index: number) => (
									<span className={styles.indicator} key={index}></span>
								))}
								<span
									className={styles.indicator_active}
									style={{
										left: `${index * 35.333}%`,
									}}
								></span>
							</div>
						</div>
						<div className={styles.body}>
							<div className={styles.image} data-animation="summary-image">
								<Image
									src={card.image}
									alt={card.title}
									fill
									sizes="100vw"
								/>
								<span className={styles.line}></span>
								<span className={styles.line}></span>
							</div>
							<div className={styles.details}>
								<div
									className={styles.alert_container}
									data-animation="alert"
								>
									<div className={styles.icon}>
										<Image
											src={card.icon}
											alt=""
											fill
											sizes="100vw"
										/>
									</div>
									<div className={styles.text}>
										<h3>{card.alert}</h3>
									</div>
								</div>
								<div className={styles.text}>
									<h2 data-animation="title">{card.title}</h2>
									<p data-animation="desc">{card.description}</p>
								</div>
								<Link href={card.url}>
									<Button
										buttonType="transparent"
										className={styles.button}
										data-animation="button"
									>
										{card.button}
									</Button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
			{scrollData.map((card: any, index: number) => (
				<div className={styles.mob_card} key={index} data-active={index === 1}>
					<div className={styles.body}>
						<div className={styles.image}>
							<Image src={card.image} alt={card.title} fill sizes="100vw" />
							<span className={styles.line}></span>
							<span className={styles.line}></span>
						</div>
						<div className={styles.details}>
							<div className={styles.alert_container}>
								<div className={styles.icon}>
									<Image src={card.icon} alt="" fill sizes="100vw" />
								</div>
								<div className={styles.text}>
									<h3>{card.alert}</h3>
								</div>
							</div>
							<div className={styles.text}>
								<h2>{card.title}</h2>
								<p>{card.description}</p>
							</div>
							<Link href={card.url}>
								<Button
									buttonType="transparent"
									className={styles.button}
								>
									{card.button}
								</Button>
							</Link>
						</div>
					</div>
				</div>
			))}
		</section>
	);
};

export default ScrollComponent;
