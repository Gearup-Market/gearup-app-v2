"use client";
import React, { useState } from "react";
import styles from "./Transactions.module.scss";
import { TransactionsTable } from "./components";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import ReuseableFilters from "../ReuseableFilter/ReuseableFilter";

interface Props {
	showTitle?: boolean;
}
const Transactions = ({ showTitle = false }: Props) => {
	const [activeFilterId, setActiveFilterId] = useState(1);
	const [activeSubFilterId, setActiveSubFilterId] = useState(1);
	const parentFilters = [
		{
			id: 1,
			name: "Rent",
			subFilters: [
				{
					id: 1,
					name: "Requested",
				},
				{
					id: 2,
					name: "Accepted/Ongoing",
				},
				{
					id: 3,
					name: "Completed",
				},
				{
					id: 4,
					name: "Canceled/declined",
				},
			],
		},
		{
			id: 2,
			name: "Buy",
			subFilters: [
				{
					id: 1,
					name: "Requested",
				},
				{
					id: 2,
					name: "Accepted/Ongoing",
				},
				{
					id: 3,
					name: "Completed",
				},
				{
					id: 4,
					name: "Canceled/declined",
				},
			],
		},
		{
			id: 3,
			name: "Courses",
			subFilters: [
				{
					id: 1,
					name: "Ebooks",
				},
				{
					id: 2,
					name: "Live",
				},
				{
					id: 3,
					name: "Video",
				},
				{
					id: 4,
					name: "Audio",
				},
			],
		},
	];
	return (
		<div className={styles.container}>
			{
				showTitle && <HeaderSubText title='Transactions' />
			}
			<div className={styles.container__download_filter}>
				<ReuseableFilters
					parentFilters={parentFilters}
					activeFilterId={activeFilterId}
					setActiveFilterId={setActiveFilterId}
					setActiveSubFilterId={setActiveSubFilterId}
					activeSubFilterId={activeSubFilterId}
				/>
				<span className={styles.container__download_filter__download_btn}>
					Download all as SVG
				</span>
			</div>
			<TransactionsTable
				transactionType={
					parentFilters
						.find(item => item.id === activeFilterId)
						?.name.toLowerCase() || "buy"
				}
			/>
		</div>
	);
};

export default Transactions;
