"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./TransactionTable.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { InputField, MobileCardContainer, NoSearchResult, Pagination } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import TransactionCardMob from "./TransactionCardMob/TransactionCardMob";
import useTransactions from "@/hooks/useTransactions";
import { TransactionType, UserRole } from "@/app/api/hooks/transactions/types";
import { useAppSelector } from "@/store/configureStore";
import NoTransactions from "../NoTransactions/NoTransactions";
import { debounce } from "lodash";

interface Props {
	transactionType: string;
}

const TransactionTable = ({ transactionType }: Props) => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [searchInput, setSearchInput] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const pageSize: number = 12;
	const { data, isFetching } = useTransactions();
	const [localData, setLocalData] = useState(data);
	const { userId } = useAppSelector(s => s.user);
	const [isNoSearchResult, setIsNoSearchResult] = useState(false);

	const transactions = useMemo(
		() =>
			localData.map(({ _id, item, buyer, amount, type, status, createdAt }) => {
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
	console.log(transactions);

	const filteredUsers = useMemo(() => {
		if (!searchInput) return transactions;
		return transactions.filter(
			transaction =>
				transaction.gearName.toLowerCase().includes(searchInput.toLowerCase()) ||
				transaction.id.toLowerCase().includes(searchInput.toLowerCase())
		);
	}, [searchInput, transactions]);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return filteredUsers.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, filteredUsers]);

	const startNumber = (currentPage - 1) * pageSize + 1;
	const endNumber = Math.min(
		startNumber + currentTableData?.length - 1,
		filteredUsers?.length
	);

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				setSearchInput(value);
			}, 300),
		[]
	);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);
	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1
	};

	// const handlePagination = (page: number) => {
	// 	const start = (page - 1) * limit;
	// 	const end = start + limit;
	// 	setPaginatedTransactions(end);
	// 	setPage(page);
	// };

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
			{transactions.length < 1 ? (
				<NoTransactions />
			) : (
				<>
					<div className={styles.container__input_filter_container}>
						<InputField
							placeholder="Enter name or id"
							icon="/svgs/icon-search-dark.svg"
							iconTitle="search-icon"
							onChange={e => debouncedSearch(e.target.value)}
						/>
						{/* <div
							className={styles.no_search_result}
							data-show={isNoSearchResult}
						>
							<NoSearchResult />
						</div> */}
					</div>

					<div
						className={styles.container__table}
						style={{ width: "100%", height: "100%" }}
					>
						<DataGrid
							rows={currentTableData}
							columns={columns}
							paginationMode="server"
							sx={customisedTableClasses}
							hideFooter
							autoHeight
							loading={isFetching}
							getRowId={row => row.id}
						/>
					</div>

					<MobileCardContainer>
						{!!transactions.length ? (
							<>
								{currentTableData.map((item, ind) => (
									<TransactionCardMob
										key={item.id}
										item={item}
										ind={ind}
										lastEle={
											ind + 1 === currentTableData.length
												? true
												: false
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
						currentPage={currentPage}
						totalCount={transactions?.length}
						pageSize={pageSize}
						onPageChange={(page: any) => setCurrentPage(page)}
						startNumber={startNumber}
						endNumber={endNumber}
					/>
				</>
			)}
		</div>
	);
};

export default TransactionTable;
