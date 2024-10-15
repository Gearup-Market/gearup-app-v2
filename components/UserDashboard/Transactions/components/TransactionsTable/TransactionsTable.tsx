"use client";
import React, { useMemo, useState } from "react";
import styles from "./TransactionTable.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { InputField, MobileCardContainer, Pagination } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import TransactionCardMob from "./TransactionCardMob/TransactionCardMob";
import useTransactions from "@/hooks/useTransactions";
import { TransactionType, UserRole } from "@/app/api/hooks/transactions/types";
import { useAppSelector } from "@/store/configureStore";
import NoTransactions from "../NoTransactions/NoTransactions";

interface Props {
	transactionType: string;
}

const TransactionTable = ({ transactionType }: Props) => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const { data, isFetching } = useTransactions();
	const { userId } = useAppSelector(s => s.user);

	const transactions = useMemo(
		() =>
			data.map(({ _id, item, buyer, amount, type, status, createdAt }) => {
				const isBuyer = userId === buyer;
				const transactionType =
					type === TransactionType.Sale && isBuyer
						? "Purchase"
						: type === TransactionType.Sale && !isBuyer
						? "Sale"
						: TransactionType.Rental;

				const userRole =
					transactionType === "Purchase"
						? UserRole.Buyer
						: transactionType === "Sale"
						? UserRole.Seller
						: transactionType === "Rental" && isBuyer
						? UserRole.Renter
						: UserRole.Lender;
				return {
					id: _id,
					gearName: item.productName,
					amount,
					transactionDate: createdAt,
					transactionType,
					transactionStatus: status,
					gearImage: item.listingPhotos[0],
					userRole
				};
			}),
		[data]
	);

	const [paginatedTransactions, setPaginatedTransactions] = useState<number>(limit);

	const filteredTransactions = useMemo(
		() => transactions.slice(page - 1 * limit, paginatedTransactions),
		[transactions, paginatedTransactions]
	);

	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1
	};

	const handlePagination = (page: number) => {
		const start = (page - 1) * limit;
		const end = start + limit;
		setPaginatedTransactions(end);
		setPage(page);
	};

	const columns: GridColDef[] = [
		{
			...sharedColDef,
			field: "gearName",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Name",
			minWidth: 250,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					<Image
						src={row.gearImage}
						alt={value || "image-trans"}
						width={16}
						height={16}
					/>
					<p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
						{value}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "amount",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Amount",
			minWidth: 200
		},
		{
			...sharedColDef,
			field: "transactionDate",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Transaction Date",
			minWidth: 150
		},
		{
			...sharedColDef,
			field: "transactionType",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Type",
			minWidth: 150
		},
		{
			...sharedColDef,
			field: "transactionStatus",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Status",
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__status_container}>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status}
						data-status={value.toLowerCase()}
					>
						{value}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "id",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Actions",
			headerAlign: "center",
			align: "center",
			minWidth: 150,
			renderCell: ({ row, value }) => (
				<Link
					href={`/user/transactions/${row.id}`}
					className={styles.container__action_btn}
				>
					view details
				</Link>
			)
		}
	];

	return (
		<div className={styles.container}>
		
					<div className={styles.container__input_filter_container}>
						<InputField
							placeholder="Search"
							icon="/svgs/icon-search-dark.svg"
							iconTitle="search-icon"
						/>
					</div>

					<div
						className={styles.container__table}
						style={{ width: "100%", height: "100%" }}
					>
						<DataGrid
							rows={filteredTransactions}
							columns={columns}
							paginationMode="server"
							sx={customisedTableClasses}
							hideFooter
							autoHeight
							loading={isFetching}
						/>
					</div>

					<MobileCardContainer>
					{!!transactions.length ? (
				<>
						{filteredTransactions.map((item, ind) => (
							<TransactionCardMob
								key={item.id}
								item={item}
								ind={ind}
								lastEle={
									ind + 1 === filteredTransactions.length ? true : false
								}
								loading={isFetching}
							/>
						))}
							</>
						) : (
							<NoTransactions />
						)}
					</MobileCardContainer>
					<Pagination
						currentPage={page}
						onPageChange={handlePagination}
						totalCount={transactions.length}
						pageSize={limit}
					/>
		
		</div>
	);
};

export default TransactionTable;
