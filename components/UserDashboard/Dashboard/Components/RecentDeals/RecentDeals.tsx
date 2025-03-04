"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./RecentDeals.module.scss";
import { DataGrid, GridAddIcon, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { AddBtn, Button, InputField, MobileCardContainer, Pagination } from "@/shared";
import RecentDealsCard from "./components/RecentDealsCard/RecentDealsCard";
import { MoreIcon, TransactionNavIcon } from "@/shared/svgs/dashboard";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import { recentDeals } from "@/mock/RecentDealsData.mock";
import useTransactions from "@/hooks/useTransactions";
import { useAppSelector } from "@/store/configureStore";
import { debounce } from "lodash";
import { formatNum } from "@/utils";
import { usePercentageToPixels } from "@/hooks";
const sharedColDef: GridColDef = {
	field: "",
	sortable: true,
	flex: 1
};
const RecentDeals = () => {
	const [searchInput, setSearchInput] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const pageSize: number = 12;
	const { data, isFetching, error } = useTransactions();
	const [paginatedTransactions, setPaginatedTransactions] =
		useState<GridRowsProp>(data);
	const containerRef = useRef<HTMLDivElement>(null);

	const titleWidth = usePercentageToPixels(containerRef, 25);
	const priceWidth = usePercentageToPixels(containerRef, 15);
	const dateWidth = usePercentageToPixels(containerRef, 15);
	const typeWidth = usePercentageToPixels(containerRef, 10);
	const statusWidth = usePercentageToPixels(containerRef, 10);
	const actionsWidth = usePercentageToPixels(containerRef, 10);

	const transactions = useMemo(
		() =>
			data.map(({ _id, item, amount, type, status, createdAt }) => {
				return {
					id: _id,
					gearName: item ? item.productName : "Listing not available",
					amount: `₦${formatNum(
						type === "Rental" ? amount : item.offer.forSell?.pricing
					)}`,
					transactionDate: createdAt.split("T")[0],
					transactionType: type,
					transactionStatus: status,
					gearImage: item ? item.listingPhotos[0] : ""
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
					<Image src={row.gearImage} alt={value} width={16} height={16} />
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
			renderCell: ({ value }) => (
				<Link
					href={`/user/transactions/${value}`}
					className={styles.container__action_btn}
				>
					<Button>View details</Button>
				</Link>
			)
		}
	];

	return (
		<div className={styles.container} ref={containerRef}>
			<h2 className={styles.container__title}> Recent Deals</h2>
			{/* {!!paginatedTransactions?.length && ( */}
			<div className={styles.container__input_filter_container}>
				{/* <InputField
						placeholder="Enter name or id"
						icon="/svgs/icon-search-dark.svg"
						iconTitle="search-icon"
						onChange={e => debouncedSearch(e.target.value)}
					/>
					<div className={styles.filter_icon_container}>
						<Image
							src="/svgs/icon-filter.svg"
							alt="filter"
							width={16}
							height={16}
						/>
						<p>Filter</p>
					</div> */}
			</div>
			{/* )} */}

			{currentTableData?.length < 1 ? (
				<div className={styles.empty_rows}>
					<span className={styles.transaction_icon}>
						<TransactionNavIcon color="#F76039" />
					</span>
					Recent deals will be displayed here
				</div>
			) : (
				<>
					<div className={styles.container__table} style={{ width: "100%" }}>
						<DataGrid
							rows={currentTableData}
							columns={columns}
							hideFooterPagination={true}
							hideFooter
							paginationMode="server"
							sx={customisedTableClasses}
							autoHeight
							loading={isFetching}
							getRowId={row => row.id}
						/>
					</div>

					<MobileCardContainer>
						{currentTableData.map((item, ind) => (
							<RecentDealsCard
								key={item.id}
								item={item}
								ind={ind}
								lastEle={
									ind + 1 === currentTableData.length ? true : false
								}
							/>
						))}
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

export default RecentDeals;
