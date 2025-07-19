import React from "react";
import styles from "./Documents.module.scss";
const Documents = ({ data }: any) => {
	return (
		<div className={styles.container}>
			<div className={styles.container__summary_container}>
				<h3 className={styles.title}>Documents</h3>
				<div className={styles.summary_item}>
					<h4>ID type</h4>
					<p>National ID</p>
				</div>
				<div className={styles.summary_item}>
					<h4>ID number</h4>
					<p>{data.kyc?.nin || ""}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Phone number</h4>
					<p>{data.kyc?.phoneNumber || "-"}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Full name</h4>
					<p>{`${data.kyc?.firstName || ""} ${data.kyc?.lastName || ""}`}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Country</h4>
					<p>{data.kyc?.country || ""}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Address</h4>
					<p>{data.kyc?.address || ""}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>City</h4>
					<p>{data.kyc?.city || ""}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Postal code</h4>
					<p>{data.kyc?.postalCode || ""}</p>
				</div>
			</div>
		</div>
	);
};

export default Documents;
