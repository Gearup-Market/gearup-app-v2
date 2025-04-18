import React from "react";
import styles from "./Shipment.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { useSearchParams } from "next/navigation";
import { Button } from "@/shared";
import {
	iTransactionDetails,
	ShippingType,
	TransactionStage,
	TransactionStatus
} from "@/interfaces";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
interface Props {
	handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
	item: iTransactionDetails;
}
const Shipment = ({ handleNext, item }: Props) => {
	const { metadata, listing, buyer, itemType } = item;
	const thirdPartyVerification = !!metadata?.thirdPartyCheckup;

	return (
		<div className={styles.container}>
			<div className={styles.container_top}>
				<HeaderSubText title="Shipment" />
				{thirdPartyVerification && (
					<div className={styles.details_container}>
						<p className={styles.details}>
							Please follow the{" "}
							<span className={styles.colored_text}>
								{" "}
								gearup service center guidelines{" "}
							</span>{" "}
							to properly ship your equipment
						</p>
					</div>
				)}
				<div className={styles.details_container}>
					<p className={styles.details}>
						Please make sure you’ve successfully shipped the gear to the buyer
						before confirming shipment{" "}
					</p>
				</div>
				<div className={styles.summary_container}>
					<h3 className={styles.title}>Shipment details</h3>
					<div className={styles.summary_item}>
						<h4>Full-name</h4>
						<p style={{ textTransform: "capitalize" }}>
							{thirdPartyVerification
								? "Gearup service center"
								: metadata?.name || buyer?.name || buyer?.userName}
						</p>
					</div>
					{metadata?.shippingType === ShippingType.Shipping && (
						<>
							<div className={styles.summary_item}>
								<h4>Shipment type</h4>
								<p>Shipment</p>
							</div>
							<div className={styles.summary_item}>
								<h4>Country</h4>
								<p>{metadata?.country}</p>
							</div>
							<div className={styles.summary_item}>
								<h4>City</h4>
								<p>{metadata?.city}</p>
							</div>
							<div className={styles.summary_item}>
								<h4>Shipment address</h4>
								<span className={styles.ellipse_container}>
									<p>{metadata?.address}</p>
								</span>
							</div>
							<div className={styles.summary_item}>
								<h4>Mobile number</h4>
								<p>{metadata?.phoneNumber}</p>
							</div>
						</>
					)}
					{metadata?.shippingType === ShippingType.LocalPickup && (
						<div className={styles.details_container}>
							<p className={styles.details}>
								Buyer has opted for local pickup option. Please ensure the{" "}
								<strong>
									{listing
										? isListing(listing, itemType as string)
											? listing.productName
											: listing.title
										: "Listing not available"}
								</strong>{" "}
								is available for pickup at the agreed time.
							</p>
						</div>
					)}
				</div>
			</div>
			<div className={styles.btn_container}>
				<Button onClick={() => handleNext(TransactionStage.SellerShipped)}>
					Confirm Shipment
				</Button>
			</div>
		</div>
	);
};

export default Shipment;
