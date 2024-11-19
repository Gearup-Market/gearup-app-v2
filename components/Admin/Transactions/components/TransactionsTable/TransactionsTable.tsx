"use client";
import React, { useMemo, useState } from "react";
import styles from "./TransactionTable.module.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import {
	Button,
	InputField,
	MobileCardContainer,
	NoSearchResult,
	Pagination
} from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import { transactions } from "@/mock/transactions.mock";
import TransactionCardMob from "./TransactionCardMob/TransactionCardMob";
import useTransactions from "@/hooks/useTransactions";
import { usePathname } from "next/navigation";
import { TransactionType, UserRole } from "@/app/api/hooks/transactions/types";
import NoTransactions from "@/components/UserDashboard/Transactions/components/NoTransactions/NoTransactions";

interface Props {
	transactionType: string;
}

const TransactionTable = ({ transactionType }: Props) => {
	const pathname = usePathname();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(7);
	const [isNoSearchResult, setIsNoSearchResult] = useState(false);
	const userId = useMemo(
		() => pathname.split("/")[pathname.split("/").length - 1],
		[pathname]
	);
	const { data, isFetching } = useTransactions(userId);

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

	// const [paginatedTransactions, setPaginatedTransactions] = useState<GridRowsProp>(
	// 	transactions.slice(0, limit)
	// );

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
			field: "gear_name",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Name",
			minWidth: 250,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					<Image src={row.gear_image} alt={value} width={16} height={16} />
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
			field: "transaction_date",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Transaction Date",
			minWidth: 150
		},
		{
			...sharedColDef,
			field: "transaction_status",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			align: "center",
			headerAlign: "center",
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
			align: "center",
			headerAlign: "center",
			minWidth: 150,
			renderCell: ({ row, value }) => (
				<Link
					href={`/admin/transactions/${row.id}?transaction_type=${transactionType}&user_role=${row.user_role}&third_party=${row.third_party_verification}&timeElapsed=${row.timeElapsed}`}
					className={styles.container__action_btn}
				>
					<Button>View details</Button>
				</Link>
			)
		}
	];

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsNoSearchResult(true);
	};

	return (
		<div className={styles.container}>
			{data.length < 1 ? (
				<NoTransactions />
			) : (
				<>
					<div className={styles.container__input_filter_container}>
						<InputField
							placeholder="Search"
							icon="/svgs/icon-search-dark.svg"
							iconTitle="search-icon"
							onChange={handleSearch}
						/>
						<div
							className={styles.no_search_result}
							data-show={isNoSearchResult}
						>
							<NoSearchResult />
						</div>
					</div>

					<div
						className={styles.container__table}
						style={{ width: "100%", height: "100%" }}
					>
						<DataGrid
							rows={transactions}
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
											ind + 1 === filteredTransactions.length
												? true
												: false
										}
										// loading={isFetching}
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
				</>
			)}
		</div>
	);
};

export default TransactionTable;
