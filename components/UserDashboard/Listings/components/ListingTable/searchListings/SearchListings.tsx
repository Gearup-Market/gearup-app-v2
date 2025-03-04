"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./SearchListings.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePercentageToPixels } from "@/hooks";
import Image from "next/image";
import { MobileCardContainer, ToggleSwitch } from "@/shared";
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
import NoListings from "../../../NoListings/NoListings";
import { PageLoader, SmallLoader } from "@/shared/loaders";
import ListingCardMob from "../ListingCardMob/ListingCardMob";

interface Props {
	setShowSearchContainer: (e?: any) => void;
	searchTerm?: string;
	setSearchTerm: (e?: any) => void;
}

const SearchListings = ({ setShowSearchContainer, searchTerm, setSearchTerm }: Props) => {
	const { userId } = useAppSelector(s => s.user);
	const [listings, setListings] = useState<Listing[]>([]);
	const { mutateAsync: postSearchListingByUser, isPending } =
		usePostSearchListingByUser();
	const debouncedSearch = useCallback(
		debounce(async () => {
			if (searchTerm) {
				try {
					const response = await postSearchListingByUser({
						userId,
						productName: searchTerm,
						description: searchTerm,
						category: searchTerm
					});
					if (response.data) {
						setListings(response.data);
					}
				} catch (error) {
					toast.error("Failed to search listings");
				}
			}
		}, 500),
		[searchTerm]
	);

	useEffect(() => {
		debouncedSearch(searchTerm);
		return () => {
			debouncedSearch.cancel();
		};
	}, [searchTerm, debouncedSearch]);

	const { mutateAsync: postChangeListingStatus, isPending: isPendingUpdate } =
		usePostChangeUserListingStatus();
	const containerRef = useRef<HTMLDivElement>(null);

	const titleWidth = usePercentageToPixels(containerRef, 25);
	const categoryWidth = usePercentageToPixels(containerRef, 10);
	const dateWidth = usePercentageToPixels(containerRef, 10);
	const statusWidth = usePercentageToPixels(containerRef, 10);
	const priceWidth = usePercentageToPixels(containerRef, 15);
	const availabilityWidth = usePercentageToPixels(containerRef, 10);
	const actionsWidth = usePercentageToPixels(containerRef, 10);

	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1
	};

	const mappedListings = useMemo(() => {
		return listings?.map(
			({
				_id,
				productName,
				offer,
				createdAt,
				listingType,
				status,
				listingPhotos,
				category
			}: any) => {
				const type = listingType === "both" ? "rent | sell" : listingType;
				const price =
					type === "rent"
						? offer?.forRent?.rates.length
							? offer?.forRent?.rates[0].price
							: 0
						: offer?.forSell?.pricing;
				const image = listingPhotos?.[0] || null;
				return {
					id: _id,
					title: productName,
					price,
					transaction_date: createdAt,
					type,
					status,
					image,
					availability: status === "available" ? "active" : "inactive",
					date: createdAt.split("T")[0],
					sold_count: 0,
					revenue: 0,
					category: category?.name?.toLowerCase() || null
				};
			}
		);
	}, [listings]);

	const columns: GridColDef[] = [
		{
			...sharedColDef,

			field: "title",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Product Name",
			minWidth: titleWidth,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					{row.image && (
						<Image src={row.image} alt={value} width={16} height={16} />
					)}
					<p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
						{value}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,

			field: "category",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Category",
			minWidth: categoryWidth
		},
		{
			...sharedColDef,

			field: "date",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Date",
			minWidth: dateWidth
		},
		{
			...sharedColDef,
			field: "status",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Status",
			minWidth: statusWidth,
			renderCell: ({ row, value }) => (
				<div className={styles.container__status_container}>
					<ToggleSwitch
						checked={value?.toLowerCase() === "available"}
						onChange={() => onToggleHideListing(row.id, row.status)}
					/>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status}
					>
						{value?.toLowerCase() === "available" ? "Live" : "draft"}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,

			field: "price",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Price",
			minWidth: priceWidth,
			renderCell: ({ value }) => "₦" + formatNum(value)
		},
		{
			...sharedColDef,

			field: "availability",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Availability",
			minWidth: availabilityWidth,
			renderCell: ({ value }) => (
				<div className={styles.container__availability_container}>
					<span
						className={styles.container__availability_container__availability}
						data-status={value?.toLowerCase()}
					>
						{value}
					</span>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "id",
			align: "center",
			headerAlign: "center",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Actions",
			minWidth: actionsWidth,
			renderCell: ({ row, value }) => (
				<Link
					href={`/user/listings/${row.id}`}
					className={styles.container__action_btn}
					onClick={() => {
						setShowSearchContainer(false);
						setSearchTerm("");
					}}
				>
					View Details
				</Link>
			)
		}
	];

	const onToggleHideListing = async (listingId: string, status: string) => {
		if (status === "unavailable")
			return toast.error("This listing has not been approved yet");
		try {
			const res = await postChangeListingStatus({
				userId,
				listingId
			});
			if (res.message === "Listing visibility updated successfully") {
				toast.success("Status updated");
				setShowSearchContainer(false);
			}
		} catch (error) {}
	};
	return (
		<div
			className={styles.container}
			onClick={e => e.nativeEvent.stopImmediatePropagation()}
		>
			{!isPending ? (
				listings.length ? (
					<>
						<div
							className={styles.container__table}
							style={{ width: "100%", height: "100%" }}
						>
							<DataGrid
								rows={mappedListings}
								columns={columns}
								hideFooterPagination={true}
								paginationMode="server"
								hideFooter
								autoHeight
								sx={customisedTableClasses}
								loading={isPending}
							/>
						</div>
						<MobileCardContainer>
							{mappedListings?.map((item: any, ind: number) => (
								<ListingCardMob
									activeFilter={"gear"}
									key={ind}
									item={item}
									ind={ind}
									// refetch={refetch}
									// onClickEdit={onClickEdit}
									onToggleHideListing={onToggleHideListing}
									lastEle={
										ind + 1 === mappedListings.length ? true : false
									}
								/>
							))}
						</MobileCardContainer>

						<div className={styles.text}>
							<p>Found {listings.length} listings</p>
						</div>
					</>
				) : (
					<NoListings showCreateButton={false} />
				)
			) : (
				<PageLoader />
			)}
		</div>
	);
};

export default SearchListings;
