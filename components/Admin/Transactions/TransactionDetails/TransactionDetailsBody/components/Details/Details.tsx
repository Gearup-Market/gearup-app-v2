"use client";
import React from "react";
import styles from "./Details.module.scss";
import { CopyIcon } from "@/shared/svgs/dashboard";
import DetailsTimeline from "../TimeLines/TimeLines";
import StatusUpdate from "../StatusUpdate/StatusUpdate";
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import { AppRoutes, copyText, formatNum } from "@/utils";
import { useGetAllPricings } from "@/app/api/hooks/Admin/pricing";
import { TransactionType } from "@/app/api/hooks/transactions/types";
import { useGetUser } from "@/app/api/hooks/users";

interface Props {
	item?: any;
}

const DetailsComponent = ({ item }: Props) => {
	const { data: allPricings, isLoading } = useGetAllPricings();
	const { data: merchant } = useGetUser({ userId: item?.seller?.userId });
	const { data: customer } = useGetUser({ userId: item?.buyer?.userId });

	const formatDate = (isoString: string): string => {
		const date = new Date(isoString);
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			month: "short",
			year: "numeric"
		};
		return date.toLocaleDateString("en-GB", options).replace(",", "");
	};

	const itemObject = {
		listing: item.item,
		type: TransactionType.Rental,
		rentalPeriod: item.rental
	};

	const price = item.amount;

	const vat = price * (allPricings?.valueAddedTax! / 100);
	const fee = price * (allPricings?.valueAddedTax! / 100);
	const total = price + vat + fee;

	return (
		<div className={styles.container}>
			<div className={styles.container__left}>
				<div className={styles.container__left__summary_container}>
					<h3 className={styles.title}>Transaction Details</h3>
					<div className={styles.summary_item}>
						<h4>Transaction type</h4>
						<p>{item.type}</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Transaction ID</h4>
						<span
							style={{ display: "flex", alignItems: "center", gap: "10px" }}
						>
							<p>{item._id}</p>
							<span
								className={styles.icon}
								onClick={() => copyText(item._id)}
							>
								<CopyIcon />
							</span>
						</span>
					</div>
					<div className={styles.summary_item}>
						<h4>Transaction date</h4>
						<p>{formatDate(item.createdAt)}</p>
					</div>
					{item.type === "Sale" ? (
						<>
							<div className={styles.summary_item}>
								<h4>Amount</h4>
								<p>₦{formatNum(item.amount)}</p>
							</div>
							{/* <div className={styles.summary_item}>
							<h4>Shipping fee</h4>
							<p>₦300</p>
						</div> */}
						</>
					) : (
						<></>
					)}
					<div className={styles.summary_item}>
						<h4>Gearup fee</h4>
						<p>₦{formatNum(fee)}</p>
					</div>
					<div className={styles.summary_item}>
						<h4>VAT</h4>
						<p>₦{formatNum(vat)}</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Total amount</h4>
						<p className={styles.total}>₦{formatNum(total)}</p>
					</div>
				</div>
				<div>
					<DetailsTimeline
						timelines={item?.stages ?? []}
						status={item?.status}
					/>
				</div>
			</div>
			<div className={styles.container__right}>
				<PersonalDetails
					title="Customer"
					name={item.buyer.userName}
					subText={
						!!customer?.data?.address ? customer?.data?.address : "Nigeria"
					}
					profileLink={`/admin/users/${item.buyer.userId}`}
				/>
				<PersonalDetails
					title="Merchant"
					name={item.seller.userName}
					subText={
						!!merchant?.data?.address ? merchant?.data?.address : "Nigeria"
					}
					profileLink={`/admin/users/${item.seller.userId}`}
				/>
				<StatusUpdate activeStatus={item?.status} />
			</div>
		</div>
	);
};

export default DetailsComponent;
