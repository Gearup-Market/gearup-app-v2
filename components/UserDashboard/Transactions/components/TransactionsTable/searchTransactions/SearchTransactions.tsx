"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./SearchTransactions.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePercentageToPixels } from "@/hooks";
import Image from "next/image";
import { MobileCardContainer, Pagination, ToggleSwitch } from "@/shared";
import { formatNum } from "@/utils";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/configureStore";
import {
	usePostChangeUserListingStatus,
	usePostSearchListingByUser
} from "@/app/api/hooks/listings";
import { customisedTableClasses } from "@/utils/classes";
import { debounce } from "lodash";
import { Listing } from "@/store/slices/listingsSlice";
import { PageLoader, SmallLoader } from "@/shared/loaders";
import TransactionCardMob from "../TransactionCardMob/TransactionCardMob";
import { useGetSearchTransactions } from "@/app/api/hooks/transactions";
import {
	Transaction,
	TransactionType,
	UserRole
} from "@/app/api/hooks/transactions/types";
import NoListings from "@/components/UserDashboard/Listings/NoListings/NoListings";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
interface Props {
	setShowSearchContainer: (e?: any) => void;
	searchTerm?: string;
	setSearchTerm: (e?: any) => void;
}

const SearchTransactions = ({
	setShowSearchContainer,
	searchTerm,
	setSearchTerm
}: Props) => {
	const { userId } = useAppSelector(s => s.user);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(
		searchTerm || ""
	);
	const { data, isFetching, refetch, isLoading } = useGetSearchTransactions(
		userId,
		currentPage,
		searchTerm || ""
	);

	const updatePage = (page: number) => {
		setCurrentPage(page);
	};

	const debouncedSearch = useCallback(
		debounce((value: string) => {
			setDebouncedSearchTerm(value);
		}, 500),
		[]
	);

	useEffect(() => {
		if (searchTerm) {
			debouncedSearch(searchTerm);
		}
		return () => {
			debouncedSearch.cancel();
		};
	}, [searchTerm, debouncedSearch]);

	useEffect(() => {
		refetch();
	}, [currentPage, debouncedSearchTerm, refetch]);

	const containerRef = useRef<HTMLDivElement>(null);

	const titleWidth = usePercentageToPixels(containerRef, 25);
	const priceWidth = usePercentageToPixels(containerRef, 15);
	const dateWidth = usePercentageToPixels(containerRef, 15);
	const typeWidth = usePercentageToPixels(containerRef, 10);
	const statusWidth = usePercentageToPixels(containerRef, 10);
	const actionsWidth = usePercentageToPixels(containerRef, 10);

	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1
	};

	const transactions: any[] = useMemo(
		() =>
			(searchTerm ? data?.data ?? [] : []).map(
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
						amount: `₦${formatNum(
							type === "Rental"
								? amount
								: isListing(item, itemType as string)
								? item.offer.forSell?.pricing
								: item.price
						)}`,
						transactionDate: createdAt.split("T")[0],
						transactionType,
						transactionStatus: status,
						gearImage: item
							? isListing(item, itemType as string)
								? item.listingPhotos[0]
								: item.cover
							: "",
						userRole
					};
				}
			) ?? [],
		[data, searchTerm]
	);

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

	console.log(searchTerm);

	return (
		<div
			className={styles.container}
			onClick={e => e.nativeEvent.stopImmediatePropagation()}
		>
			{!isLoading ? (
				transactions.length ? (
					<>
						<div
							className={styles.container__table}
							style={{ width: "100%", height: "100%" }}
						>
							<DataGrid
								rows={transactions}
								columns={columns}
								hideFooterPagination={true}
								paginationMode="server"
								hideFooter
								autoHeight
								sx={customisedTableClasses}
								loading={isFetching}
							/>
						</div>
						<MobileCardContainer>
							{transactions?.map((item: any, ind: number) => (
								<TransactionCardMob
									key={ind}
									item={item}
									ind={ind}
									loading={isFetching}
									lastEle={
										ind + 1 === transactions.length ? true : false
									}
								/>
							))}
						</MobileCardContainer>

						<div className={styles.text}>
							<p>Found {transactions.length} listings</p>
						</div>
					</>
				) : (
					<NoListings
						description="No Transactions Found!"
						showCreateButton={false}
					/>
				)
			) : (
				<PageLoader />
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

export default SearchTransactions;
