"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { usePercentageToPixels } from "@/hooks";
import { formatNum } from "@/utils";

interface Props {
	transactionType: string;
}

const TransactionTable = ({ transactionType }: Props) => {
	const [searchInput, setSearchInput] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { userId } = useAppSelector(s => s.user);
	const { data, isFetching, refetch, pagination } = useTransactions(
		userId,
		currentPage
	);
	const [isNoSearchResult, setIsNoSearchResult] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const titleWidth = usePercentageToPixels(containerRef, 25);
	const priceWidth = usePercentageToPixels(containerRef, 15);
	const dateWidth = usePercentageToPixels(containerRef, 15);
	const typeWidth = usePercentageToPixels(containerRef, 10);
	const statusWidth = usePercentageToPixels(containerRef, 10);
	const actionsWidth = usePercentageToPixels(containerRef, 10);

	const updatePage = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		refetch();
	}, [currentPage, refetch]);

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
					gearName: item ? item.productName : "Listing not available",
					amount: `₦${formatNum(
						type === "Rental" ? amount : item.offer.forSell?.pricing
					)}`,
					transactionDate: createdAt.split("T")[0],
					transactionType,
					transactionStatus: status,
					gearImage: item ? item.listingPhotos[0] : "",
					userRole
				};
			}),
		[data]
	);

	const filteredUsers = useMemo(() => {
		if (!searchInput) return transactions;
		return transactions.filter(
			transaction =>
				transaction.gearName.toLowerCase().includes(searchInput.toLowerCase()) ||
				transaction.id.toLowerCase().includes(searchInput.toLowerCase())
		);
	}, [searchInput, transactions]);

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

	const columns: GridColDef[] = [
		{
			...sharedColDef,
			field: "gearName",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Name",
			minWidth: titleWidth,
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
			minWidth: priceWidth
		},
		{
			...sharedColDef,
			field: "transactionDate",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Transaction Date",
			minWidth: dateWidth
		},
		{
			...sharedColDef,
			field: "transactionType",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Type",
			minWidth: typeWidth
		},
		{
			...sharedColDef,
			field: "transactionStatus",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Status",
			minWidth: statusWidth,
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
			minWidth: actionsWidth,
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
			{transactions.length < 1 ? (
				<NoTransactions />
			) : (
				<>
					<div
						className={styles.container__table}
						style={{ width: "100%", height: "100%" }}
					>
						<DataGrid
							rows={filteredUsers}
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
								{filteredUsers.map((item, ind) => (
									<TransactionCardMob
										key={item.id}
										item={item}
										ind={ind}
										lastEle={
											ind + 1 === filteredUsers.length
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
				</>
			)}
			<Pagination
				currentPage={currentPage}
				totalCount={pagination?.totalCount || 0}
				pageSize={10}
				onPageChange={(page: any) => updatePage(page)}
			/>
		</div>
	);
};

export default TransactionTable;
