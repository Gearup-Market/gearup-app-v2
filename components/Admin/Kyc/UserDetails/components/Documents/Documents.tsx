import React from "react";
import styles from "./Documents.module.scss";
import { Kyc } from "@/app/api/hooks/Admin/users/types";
import { Option } from "@/shared/selects/select/Select";
import Link from "next/link";

const identificationOptions: Option[] = [
	{ label: "International Passport", value: "intl_passport" },
	{ label: "Driver’s License", value: "driver_license" },
	{ label: "Voter’s Card", value: "voters_card" },
	{ label: "National ID / NIN Slip", value: "national_id" }
];

const Documents = ({ data, kycData }: { data: any; kycData?: Kyc }) => {
	// const documentType = identificationOptions.find(
	// 	doc => doc.value === kycData?.documentType
	// )?.label;
	return (
		<div className={styles.container}>
			<div className={styles.container__summary_container}>
				<h3 className={styles.title}>Documents</h3>
				<div className={styles.summary_item}>
					<h4>Full name</h4>
					<p>{`${kycData?.firstName} ${kycData?.lastName}`}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>NIN</h4>
					<p>{kycData?.nin || "not submitted"}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Phone number</h4>
					<p>{kycData?.phoneNumber || "not submitted"}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Email</h4>
					<p>{kycData?.userId?.email || "not submitted"}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Address</h4>
					<p>{kycData?.address || "not submitted"}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>City</h4>
					<p>{kycData?.city || "not submitted"}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Country</h4>
					<p>{kycData?.country || "not submitted"}</p>
				</div>
			</div>
		</div>
	);
};

export default Documents;
