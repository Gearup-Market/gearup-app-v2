"use client";
import React, { useEffect, useState } from "react";
import styles from "./WalletTransactionsTable.module.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { Button, InputField, Pagination } from "@/shared";
import { fiatWalletTransactions } from "@/mock/fiatWalletTransactions.mock";
import { iWTransaction } from "@/app/api/hooks/wallets/types";
import { useWalletTransactions } from "@/hooks";

const WalletTransactionsTable = () => {
	const [page, setPage] = useState(1);
	const [skip, setSkip] = useState(0);
	const [limit, setLimit] = useState(5);
	const { data, pagination, isFetching, refetch } = useWalletTransactions({ limit, skip });

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(".options_icon") && !target.closest(".popover-content")) {
				/* setAnchorEl(null);
				setOpenPopover(false); */
			}
		};
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	const handlePagination = (page: number) => {
		const offset = (page - 1) * limit;
		setPage(page)
		setSkip(offset);
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

			<div>
				<ul className={styles.container__table}>
					{data.map(transaction => (
						<li
							className={styles.container__table__row}
							key={transaction._id}
						>
							<div className={styles.container__table__row__left}>
								<div
									className={styles.container__table__row__left__avatar}
								>
									<Image
										src={
											transaction.type.toLowerCase() === "debit"
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
									<p className={styles.type}>{transaction.type}</p>
									<p className={styles.amount}>{transaction.amount}</p>
								</div>
							</div>
							<div className={styles.container__table__row__right}>
								<p
									className={styles.status}
									data-status={transaction.status.toLowerCase()}
								>
									{transaction.status}
								</p>
								<p className={styles.date}>{transaction.createdAt}</p>
							</div>
						</li>
					))}
				</ul>
				<Pagination
					currentPage={page}
					onPageChange={handlePagination}
					totalCount={pagination.totalCount}
					pageSize={limit}
				/>
			</div>
		</div>
	);
};

export default WalletTransactionsTable;
