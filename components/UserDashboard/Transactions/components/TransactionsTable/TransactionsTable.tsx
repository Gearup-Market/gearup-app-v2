"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./TransactionTable.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { InputField, MobileCardContainer, NoSearchResult, Pagination } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import TransactionCardMob from "./TransactionCardMob/TransactionCardMob";
import useTransactions from "@/hooks/useTransactions";
import {
	Transaction,
	TransactionType,
	UserRole
} from "@/app/api/hooks/transactions/types";
import { useAppSelector } from "@/store/configureStore";
import NoTransactions from "../NoTransactions/NoTransactions";
import { debounce } from "lodash";
import { usePercentageToPixels } from "@/hooks";
import { formatNum } from "@/utils";
import { getTransactions } from "@/app/api/hooks/transactions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import SearchTransactions from "./searchTransactions/SearchTransactions";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
const TransactionTable = () => {
	const [showSearchContainer, setShowSearchContainer] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { userId } = useAppSelector(s => s.user);
	const search = useSearchParams();
	const searchParams = new URLSearchParams(search.toString());
	const router = useRouter();
	const pathName = usePathname();
	const page = searchParams.get("page");

	const queryParams = {
		status: searchParams.get("status") || undefined,
		type: searchParams.get("type") || undefined
	};

	const { data, isFetching, refetch } = useQuery({
		queryKey: ["transactions", { page, userId, ...queryParams }],
		queryFn: getTransactions,
		refetchInterval: 60000,
		enabled: true
	});
	const [isNoSearchResult, setIsNoSearchResult] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const titleWidth = usePercentageToPixels(containerRef, 25);
	const priceWidth = usePercentageToPixels(containerRef, 15);
	const dateWidth = usePercentageToPixels(containerRef, 15);
	const typeWidth = usePercentageToPixels(containerRef, 10);
	const statusWidth = usePercentageToPixels(containerRef, 10);
	const actionsWidth = usePercentageToPixels(containerRef, 10);

	const updatePage = useCallback(
		(page: number) => {
			const current = new URLSearchParams(Array.from(searchParams.entries()));
			current.set("page", page.toString());
			const search = current.toString();
			const query = search ? `?${search}` : "";

			router.push(`${pathName}${query}`);
		},
		[pathName, router, searchParams]
	);

	useEffect(() => {
		if (!page) {
			updatePage(1);
		}
	}, [page, updatePage]);

	const transactions: any[] = useMemo(
		() =>
			data?.data.map(
				({
					_id,
					item,
					buyer,
					amount,
					type,
					status,
					createdAt,
					itemType
				}: Transaction) => {
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
						gearName: item
							? isListing(item, itemType as string)
								? item.productName
								: item.title
							: "Listing not available",
						amount,
						transactionDate: createdAt.split("T")[0],
						transactionType,
						transactionStatus: status,
						gearImage: item
							? isListing(item, itemType as string)
								? item.listingPhotos[0]
								: item.cover
							: "",
						userRole,
						item,
						itemType,
						type
					};
				}
			),
		[data]
	);

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				setSearchTerm(value);
			}, 300),
		[]
	);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	useEffect(() => {
		const handleClickOutside = () => {
			setShowSearchContainer(false);
			setSearchTerm("");
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

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
			minWidth: priceWidth,
			renderCell: ({ value }) => "₦" + formatNum(value)
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
			minWidth: typeWidth,
			renderCell: ({ row, value }) => (row.type === "Shares" ? "Shares" : value)
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
				<>
					{row.item ? (
						<Link
							href={`/user/transactions/${row.id}`}
							className={styles.container__action_btn}
						>
							view details
						</Link>
					) : (
						<p className={styles.container__action_btn}>Listing Not Found</p>
					)}
				</>
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
					onClick={e => {
						e.nativeEvent.stopImmediatePropagation();
						setShowSearchContainer(true);
					}}
					onChange={e => setSearchTerm(e.target.value)}
				/>
				{/* <div
							className={styles.no_search_result}
							data-show={isNoSearchResult}
						>
							<NoSearchResult />
						</div> */}
			</div>
			{transactions?.length < 1 ? (
				<NoTransactions />
			) : (
				<>
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
							getRowId={row => row.id}
						/>
					</div>

					<MobileCardContainer>
						{!!transactions?.length ? (
							<>
								{transactions.map((item, ind) => (
									<TransactionCardMob
										key={item.id}
										item={item}
										ind={ind}
										lastEle={
											ind + 1 === transactions.length ? true : false
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
			{showSearchContainer && (
				<SearchTransactions
					setShowSearchContainer={setShowSearchContainer}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}
			<Pagination
				currentPage={currentPage}
				totalCount={data?.pagination?.totalCount || 0}
				pageSize={10}
				onPageChange={(page: any) => updatePage(page)}
			/>
		</div>
	);
};

export default TransactionTable;
