import React from "react";
import styles from "./HomeInfo.module.scss";
import Image from "next/image";

interface BoxProps {
	title: string;
	description: string;
	icon: string;
}

const infoList: BoxProps[] = [
	{
		title: "Secured escrow payment",
		description:
			"We holds on to the transaction money until both parties are satisfied. Thereby mitigating scams and fraud",
		icon: "/svgs/icon-security.svg"
	},
	{
		title: "Verified sellers only",
		description:
			"We carefully make sure that our sellers are 100% ID verified before they can sell or list their gears on our platform",
		icon: "/svgs/icon-verified.svg"
	},
	{
		title: "Insurance coverage",
		description:
			"We provide up to $20,000 per rental insurance coverage on gears in the advent of fire damage, electrical damage, theft etc",
		icon: "/svgs/icon-insurance.svg"
	},
	{
		title: "Third party check",
		description:
			"Buyers have the option to Opt for Third-Party Check of your gear to make sure the equipment is in agreed condition",
		icon: "/svgs/icon-check.svg"
	}
];

const HomeInfo = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				{infoList.map((info: BoxProps, index: number) => (
					<InfoBox props={info} key={index} />
				))}
			</div>
		</section>
	);
};

export default HomeInfo;

const InfoBox = ({ props }: any) => {
	return (
		<div className={styles.box}>
			<div className={styles.icon}>
				<Image src={props.icon} fill alt={props.title} sizes="100vw" />
			</div>
			<div className={styles.text}>
				<h3>{props.title}</h3>
				<p>{props.description}</p>
			</div>
		</div>
	);
};
