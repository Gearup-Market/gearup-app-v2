"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ListingTable.module.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { AddBtn, Button, InputField, MobileCardContainer, ToggleSwitch } from "@/shared";
import { MoreIcon } from "@/shared/svgs/dashboard";
import { GridIcon, ListIcon } from "@/shared/svgs/dashboard";
import ListingCard from "../ListingCard/ListingCard";
import MoreModal from "../MoreModal/MoreModal";
import { customisedTableClasses } from "@/utils/classes";
import Pagination from "../../../../../shared/pagination/Pagination";
import { Popper } from "@mui/material";
import { userListingsData } from "@/mock";
import Fade from "@mui/material/Fade";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { Filter } from "@/interfaces/Listing";
import { useRouter } from "next/navigation";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useGetListings, usePostChangeListingStatus } from "@/app/api/hooks/listings";
import toast from "react-hot-toast";
import { formatDate, formatNum } from "@/utils";
import NoListings from "@/components/UserDashboard/Listings/NoListings/NoListings";
import ListingCardMob from "./ListingCarMob/ListingCarMob";
import Link from "next/link";
import { useAdminGetAllListings } from "@/app/api/hooks/Admin/listings";

interface Props {
	activeFilter: string;
	activeSubFilterId: number | string;
	filters: Filter[];
	handleAddItem: () => void;
	userid?: string;
}

const ListingTable = ({
	activeFilter,
	activeSubFilterId,
	filters,
	userid,
	handleAddItem
}: Props) => {
	const [activeLayout, setActiveLayout] = useState("list");
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [page, setPage] = useState(1);
	const [selectedRow, setSelectedRow] = useState<any | undefined>();
	const [openPoppover, setOpenPopover] = useState(Boolean(anchorEl));
	// const { userId } = useAppSelector(s => s.user);
	const { data, isFetching, refetch, isLoading } = useAdminGetAllListings();
	const listings = data?.data || [];
	// console.log(data);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const mappedListings = useMemo(() => {
		const activeSubFilter = filters
			?.find(filter => filter.name.toLowerCase() === activeFilter)
			?.name.toLowerCase();

		return listings
			.map(
				({
					_id,
					productName,
					offer,
					createdAt,
					listingType,
					status,
					listingPhotos,
					category,
					user
				}) => {
					const type = listingType === "both" ? "rent | sell" : listingType;
					const price =
						type === "rent"
							? offer?.forRent?.day1Offer
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
						date: createdAt,
						sold_count: 0,
						revenue: 0,
						category: category?.name?.toLowerCase() || null,
						user
					};
				}
			)
			.filter(l => {
				if (!l.type.includes(activeFilter)) return false;
				/* if (
					activeSubFilter &&
					activeSubFilter !== l.category &&
					activeSubFilterId !== 1
				)
					return false; */
				return true;
			});
	}, [listings, activeFilter, activeSubFilterId, filters]);

	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1
	};

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	// const onClickEdit = (listingId: string) => {
	// 	const listing = listings.find(l => l._id === listingId);
	// 	const {
	// 		productName,
	// 		description,
	// 		category,
	// 		subCategory,
	// 		condition,
	// 		offer,
	// 		listingPhotos,
	// 		_id
	// 	} = listing!;
	// 	const payload = {
	// 		_id,
	// 		productName,
	// 		description,
	// 		category,
	// 		subCategory,
	// 		condition,
	// 		offer,
	// 		listingPhotos,
	// 		fieldValues: [],
	// 		tempPhotos: [],
	// 		userId
	// 	};

	// 	dispatch(updateNewListing(payload));
	// 	router.push(`/new-listing/listing-details`);
	// };

	const { mutateAsync: postChangeListingStatus, isPending: isPendingUpdate } =
		usePostChangeListingStatus();

	const onToggleHideListing = async (
		listingId: string,
		status: string,
		userId: string
	) => {
		try {
			const res = await postChangeListingStatus({
				status: status === "available" ? "unavailable" : "available",
				userId,
				listingId
			});
			if (res.data) {
				toast.success("Status updated");
				refetch();
				// window.location.reload();
			}
		} catch (error) {}
	};

	const columns: GridColDef[] = [
		{
			...sharedColDef,

			field: "title",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Product Name",
			minWidth: 300,
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
			minWidth: 200
		},
		{
			...sharedColDef,

			field: "date",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Date",
			minWidth: 150,
			renderCell: ({ value }) => formatDate(value)
		},
		{
			...sharedColDef,
			field: "status",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Status",
			minWidth: 150,
			renderCell: ({ row, value }) => (
				<div className={styles.container__status_container}>
					<ToggleSwitch
						checked={value?.toLowerCase() === "available"}
						onChange={() =>
							onToggleHideListing(row.id, row.status, row.user.userId)
						}
					/>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status}
					>
						{value?.toLowerCase() === "available" ? "Live" : "Paused"}
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
			minWidth: 150,
			renderCell: ({ value }) => "₦" + formatNum(value)
		},
		{
			...sharedColDef,

			field: "availability",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Availability",
			minWidth: 150,
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
			minWidth: 150,
			renderCell: ({ row, value }) => (
				<Link href={`/admin/listings/${row.id}`} className={styles.action_btn}>
					<Button buttonType="transparent" className={styles.view_btn}>
						View details
					</Button>
				</Link>
			)
		}
	];

	const coursesColumns: GridColDef[] = [
		{
			...sharedColDef,
			field: "title",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Course Name",
			minWidth: 300,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					<Image src={row.image} alt={value} width={16} height={16} />
					<p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
						{value}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "sold_count",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Sold",
			minWidth: 200
		},
		{
			...sharedColDef,
			field: "revenue",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Revenue",
			minWidth: 150
		},
		{
			...sharedColDef,
			field: "price",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Price",
			minWidth: 150
		},
		{
			...sharedColDef,

			field: "status",

			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Status",
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__status_container}>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status_courses}
						data-status={value?.toLowerCase()}
					>
						{value?.toLowerCase() === "ongoing" ? "Published" : "Draft"}
					</p>
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
			minWidth: 150,
			renderCell: ({ row, value }) => (
				<span className={`${styles.container__action_btn} options_icon`}>
					<Popper
						id={"simple-popover"}
						open={openPoppover}
						anchorEl={anchorEl}
						transition
					>
						{({ TransitionProps }) => (
							<Fade {...TransitionProps} timeout={200}>
								<div className={`${styles.more_modal} popover-content`}>
									<MoreModal
										row={selectedRow}
										activeFilter={activeFilter}
									/>
								</div>
							</Fade>
						)}
					</Popper>
					<MoreIcon
						onClick={e => {
							setOpenPopover(true);
							setSelectedRow(row);
							handlePopoverOpen(e);
						}}
					/>
				</span>
			)
		}
	];

	useEffect(() => {
		// Function to handle click events
		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// Check if the click happened outside the specified elements
			if (!target.closest(".options_icon") && !target.closest(".popover-content")) {
				setAnchorEl(null);
				setOpenPopover(false);
			}
		};

		// Add event listener to the document
		document.addEventListener("click", handleClick);

		// Clean up the event listener
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	const listData = [
		{
			id: 1,
			icon: <ListIcon />,
			value: "list"
		},
		{
			id: 2,
			icon: <GridIcon />,
			value: "grid"
		}
	];

	return (
		<div className={styles.container}>
			{mappedListings.length > 0 ? (
				<>
					<div className={styles.container__input_filter_container}>
						<InputField
							placeholder="Search"
							icon="/svgs/icon-search-dark.svg"
							iconTitle="search-icon"
						/>
						<div className={styles.layout_icons}>
							{listData.map(data => (
								<span
									key={data.id}
									onClick={() => setActiveLayout(data.value)}
									data-active={activeLayout === data.value}
									data-type={data.value}
									className={styles.layout_icons__icon}
								>
									{data.icon}
								</span>
							))}
						</div>
					</div>
					{activeLayout === "list" ? (
						<>
							<div
								className={styles.container__table}
								style={{ width: "100%", height: "100%" }}
							>
								<DataGrid
									rows={mappedListings}
									columns={
										activeFilter === "courses"
											? coursesColumns
											: columns
									}
									hideFooterPagination={true}
									paginationMode="server"
									hideFooter
									autoHeight
									sx={customisedTableClasses}
									loading={isFetching}
								/>
							</div>

							<MobileCardContainer>
								{mappedListings.map((item, ind) => (
									<ListingCardMob
										activeFilter={activeFilter}
										key={ind}
										item={item}
										ind={ind}
										lastEle={
											ind + 1 === mappedListings.length
												? true
												: false
										}
									/>
								))}
							</MobileCardContainer>
							<Pagination
								currentPage={1}
								onPageChange={setPage}
								totalCount={mappedListings.length}
								pageSize={5}
							/>
						</>
					) : (
						<>
							<div className={styles.container__grid}>
								{mappedListings.map((item, ind) => (
									<Link
										key={ind}
										href={`/admin/listings/${item.id}`}
										className={styles.action_btn}
									>
										<ListingCard
											props={item}
											activeFilter={activeFilter}
											activeRow={selectedRow}
											setActiveRow={setSelectedRow}
										/>
									</Link>
								))}
							</div>
						</>
					)}
				</>
			) : (
				<NoListings />
			)}
		</div>
	);
};

export default ListingTable;
