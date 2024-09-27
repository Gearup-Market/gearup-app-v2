"use client";
import React, { useEffect, useState } from "react";
import styles from "./XlmTransactionTable.module.scss";
import Image from "next/image";
import { Button, InputField, Pagination } from "@/shared";
import { useStellarWalletTransactions } from "@/hooks";
import { PageLoader } from "@/shared/loaders";

const XlmTransactionsTable = () => {
	const [page, setPage] = useState(1);
	const [cursor, setCursor] = useState<string | undefined>(undefined);
	const [limit, setLimit] = useState(5);
	const {
		data: xlmTransactions,
		isFetching,
		refetch
	} = useStellarWalletTransactions({ limit, cursor });

	const handlePagination = (page: number) => {
		const start = (page - 1) * limit;
		const end = start + limit;
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__input_filter_container}>
				<InputField
					placeholder="Search"
					icon="/svgs/icon-search-dark.svg"
					iconTitle="search-icon"
				/>
			</div>

			<ul className={styles.container__table}>
				{isFetching && <PageLoader />}

				{xlmTransactions.map(transaction => (
					<li className={styles.container__table__row} key={transaction.id}>
						<div className={styles.container__table__row__left}>
							<div className={styles.container__table__row__left__avatar}>
								<Image
									src={
										Number(transaction.totalReceived) > 0
											? "/svgs/wallet-deposit-green.svg"
											: "/svgs/wallet-withdraw-yellow.svg"
									}
									alt="admin-img"
									width={16}
									height={16}
								/>
							</div>
							<div
								className={
									styles.container__table__row__left__name_amount
								}
							>
								<p className={styles.type}>
									{Number(transaction.totalReceived) > 0
										? "Deposit"
										: "Transfer"}
								</p>
								<p className={styles.amount}>
									{Number(transaction.totalReceived) > 0
										? `From: ${transaction.sourceAccount.substring(
												0,
												5
										  )}....${transaction.sourceAccount.slice(-4)}`
										: `You`}
								</p>
							</div>
						</div>
						<div className={styles.container__table__row__right}>
							<p
								className={styles.type}
								data-type={
									Number(transaction.totalReceived) > 0
										? "deposit"
										: "transfer"
								}
							>
								{Number(transaction.totalReceived) > 0
									? transaction.totalReceived
									: transaction.totalSent}{" "}
								XLM
							</p>
							<p className={styles.date}>{new Date(transaction.createdAt).toDateString()}</p>
						</div>
					</li>
				))}
			</ul>

			<Pagination
				currentPage={page}
				onPageChange={handlePagination}
				totalCount={xlmTransactions.length}
				pageSize={limit}
			/>
		</div>
	);
};

export default XlmTransactionsTable;
