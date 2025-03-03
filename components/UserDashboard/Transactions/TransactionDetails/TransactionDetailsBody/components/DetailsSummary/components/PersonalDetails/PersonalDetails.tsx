import React from "react";
import styles from "./PersonalDetails.module.scss";
import { LocationEllipse, VerifyIcon } from "@/shared/svgs/dashboard";
import { Button } from "@/shared";
import Link from "next/link";
import Image from "next/image";

interface Props {
	name: string;
	subText?: string;
	profileLink: string;
	profilePhoto: string;
	forSale: boolean;
	isBuyer?: boolean;
}

const PersonalDetails = ({
	name,
	subText,
	profileLink,
	profilePhoto,
	forSale,
	isBuyer
}: Props) => {
	const title = () => (isBuyer ? "Merchant" : "Customer");
	return (
		<div className={styles.container}>
			<div className={styles.container__customer_container}>
				<h3 className={styles.title}>{title()}</h3>
				<div className={styles.location_details}>
					<span className={styles.location_icon}>
						<Image src={profilePhoto} alt={name} width={16} height={16} />
					</span>
					<div style={{ textTransform: "capitalize" }}>
						<h4>{name}</h4>
						<p>{subText}</p>
					</div>
					<span className={styles.verfiy_icon}>
						<VerifyIcon />
					</span>
				</div>
				<div className={styles.btn_container}>
					<Button buttonType="secondary" className={styles.btn}>
						<Link href={profileLink}>View Profile</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PersonalDetails;
