"use client";
import React, { useMemo, useState } from "react";
import styles from "./Transactions.module.scss";
import { TransactionsTable } from "./components";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import ReuseableFilters from "../ReuseableFilter/ReuseableFilter";
import { Filter } from "@/interfaces/Listing";

const Transactions = () => {
	const [activeFilterId, setActiveFilterId] = useState(1);
	const [activeFilter, setActiveFilter] = useState<Filter>({
		id: 1,
		name: "All",
		subFilters: []
	});
	const parentFilters = [
		{
			id: 1,
			name: "Rent",
			subFilters: [
				{
					id: 2,
					name: "Requested"
				},
				{
					id: 3,
					name: "Accepted/Ongoing"
				},
				{
					id: 4,
					name: "Completed"
				},
				{
					id: 5,
					name: "Canceled/declined"
				}
			]
		},
		{
			id: 2,
			name: "Buy",
			subFilters: [
				{
					id: 2,
					name: "Requested"
				},
				{
					id: 3,
					name: "Accepted/Ongoing"
				},
				{
					id: 4,
					name: "Completed"
				},
				{
					id: 5,
					name: "Canceled/declined"
				}
			]
		}
	];

	return (
		<div className={styles.container}>
			<HeaderSubText title="Transactions" variant="main" />
			<div className={styles.container__download_filter}>
				<ReuseableFilters
					parentFilters={parentFilters}
					page="transactions"
					childrenQueryName="status"
					setActiveFilter={setActiveFilter}
					activeFilter={activeFilter}
				/>
				<span className={styles.container__download_filter__download_btn}>
					Download all as SVG
				</span>
			</div>
			<TransactionsTable />
		</div>
	);
};

export default Transactions;
