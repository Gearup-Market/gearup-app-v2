"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ListingTable.module.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { AddBtn, InputField, MobileCardContainer, ToggleSwitch } from "@/shared";
import { MoreIcon } from "@/shared/svgs/dashboard";
import { GridIcon, ListIcon } from "@/shared/svgs/dashboard";
import ListingCard from "../ListingCard/ListingCard";
import MoreModal from "../MoreModal/MoreModal";
import { customisedTableClasses } from "@/utils/classes";
import Pagination from "../../../../../shared/pagination/Pagination";
import { Popper } from "@mui/material";
import Fade from "@mui/material/Fade";
import ListingCardMob from "./ListingCardMob/ListingCardMob";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { Filter } from "@/interfaces/Listing";
import { useRouter, useSearchParams } from "next/navigation";
import { updateNewListing } from "@/store/slices/addListingSlice";
import {
	getListingsByUser,
	usePostChangeListingStatus,
	usePostChangeUserListingStatus,
	usePostRemoveListing
} from "@/app/api/hooks/listings";
import toast from "react-hot-toast";
import { formatNum } from "@/utils";
import NoListings from "../../NoListings/NoListings";
import { getCoursesByUser, useGetAllCourses } from "@/app/api/hooks/courses";
import { useCoursesByUser, useListingsByUser } from "@/hooks/useListings";
import { usePercentageToPixels } from "@/hooks";
import ConfirmPin from "@/components/UserDashboard/Settings/components/confirmPin/ConfirmPin";
import { useQuery } from "@tanstack/react-query";
import SearchListings from "./searchListings/SearchListings";
import { Course } from "@/store/slices/coursesSlice";
import { updateNewCourse } from "@/store/slices/addCourseSlice";

interface Props {
	activeFilter: Filter;
}

const ListingTable = ({ activeFilter }: Props) => {
	const [activeLayout, setActiveLayout] = useState("list");
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedRow, setSelectedRow] = useState<any | undefined>();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [listingIdToDelete, setListingIdToDelete] = useState<string>("");
	const [openPoppover, setOpenPopover] = useState(Boolean(anchorEl));
	const [showSearchContainer, setShowSearchContainer] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const containerRef = useRef<HTMLDivElement>(null);

	const titleWidth = usePercentageToPixels(containerRef, 25);
	const categoryWidth = usePercentageToPixels(containerRef, 10);
	const dateWidth = usePercentageToPixels(containerRef, 10);
	const statusWidth = usePercentageToPixels(containerRef, 10);
	const priceWidth = usePercentageToPixels(containerRef, 15);
	const availabilityWidth = usePercentageToPixels(containerRef, 10);
	const actionsWidth = usePercentageToPixels(containerRef, 10);

	const { userId } = useAppSelector(s => s.user);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const search = useSearchParams();
	const searchParams = new URLSearchParams(search.toString());
	const type = searchParams.get("type");

	const queryParams = {
		category: searchParams.get("category") || undefined,
		type: type || undefined
	};

	const { courses: userCourses } = useCoursesByUser(currentPage, queryParams);

	const {
		data: userListings,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ["getUserListings", { page: currentPage, userId, ...queryParams }],
		queryFn: getListingsByUser,
		refetchInterval: 60000,
		enabled: true
	});

	// const {
	// 	data: userCourses,
	// 	isFetching: courseFetching,
	// 	refetch: courseRefetch
	// } = useQuery({
	// 	queryKey: ["getUserCourses", { page: currentPage, userId, ...queryParams }],
	// 	queryFn: getCoursesByUser,
	// 	refetchInterval: 60000,
	// 	enabled: true
	// });

	const { mutateAsync: postRemoveListing, isPending: isPendingRemoval } =
		usePostRemoveListing();

	const updatePage = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		refetch();
	}, [currentPage, refetch]);

	const listings = userListings?.data || [];
	const courses = userCourses?.data || [];

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

	const mappedCourses = useMemo(() => {
		return courses?.map((course: Course) => {
			return {
				...course,
				id: course._id
			};
		});
	}, [listings]);

	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1
	};

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const closePopOver = () => {
		setOpenPopover(false);
	};

	const onClickEdit = (listingId: string) => {
		const listing = listings?.find((l: any) => l._id === listingId);
		const {
			productName,
			description,
			category,
			subCategory,
			condition,
			offer,
			listingPhotos,
			_id,
			location,
			listingType,
			productionType
		} = listing!;
		const payload = {
			_id,
			productName,
			description,
			category,
			subCategory,
			...(condition ? { condition } : {}),
			offer,
			listingPhotos,
			fieldValues: listing?.fieldValues,
			tempPhotos: [],
			items: [{ name: productName, quantity: 1, id: 0 }],
			userId,
			location,
			listingType,
			productionType
		};

		dispatch(updateNewListing(payload));
		router.push(`/new-listing/listing-details`);
	};

	const onClickEditCourse = (courseId: string) => {
		const course = courses?.find((l: any) => l._id === courseId);
		const payload = {
			...course,
			tempPhoto: []
		};

		dispatch(updateNewCourse(payload));
		router.push(`/course-listing?id=${course?._id}`);
	};

	const { mutateAsync: postChangeListingStatus, isPending: isPendingUpdate } =
		usePostChangeUserListingStatus();

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
				refetch();
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};

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
										onClickEdit={onClickEdit}
										refetch={refetch}
										closePopOver={closePopOver}
										activeFilter={activeFilter}
										// handleDelete={handleOpenDeleteModal}
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

	const coursesColumns: GridColDef[] = [
		{
			...sharedColDef,
			field: "title",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Course Name",
			minWidth: titleWidth,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					<Image src={row.cover} alt={value} width={16} height={16} />
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
			minWidth: categoryWidth,
			renderCell: ({ value }) => 10
		},
		{
			...sharedColDef,
			field: "revenue",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Revenue",
			minWidth: dateWidth,
			renderCell: ({ value }) => "₦" + formatNum(10)
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

			field: "status",

			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Status",
			minWidth: statusWidth,
			renderCell: ({ value }) => (
				<div className={styles.container__status_container}>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status_courses}
						// data-status={value?.toLowerCase()}
						data-status={"available"}
					>
						{/* {value?.toLowerCase() === "ongoing" ? "Published" : "Draft"} */}
						Live
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
			minWidth: actionsWidth,
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
										refetch={refetch}
										closePopOver={closePopOver}
										type="courses"
										onClickEdit={onClickEditCourse}
										// handleDelete={handleOpenDeleteModal}
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

	const handleOpenDeleteModal = (id: string) => {
		setListingIdToDelete(id);
		setOpenModal(true);
	};

	const onDeleteListing = async () => {
		if (!listingIdToDelete) return;
		try {
			const payload = { userId, listingId: listingIdToDelete };
			const res = await postRemoveListing(payload);
			if (res.data) {
				toast.success("Listing deleted");
				refetch!();
				closePopOver!();
			}
		} catch (error) {}
	};

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

	return (
		<div className={styles.container} ref={containerRef}>
			<div className={styles.container__input_filter_container}>
				<InputField
					placeholder="Search"
					icon="/svgs/icon-search-dark.svg"
					iconTitle="search-icon"
					value={searchTerm}
					onClick={e => {
						e.nativeEvent.stopImmediatePropagation();
						setShowSearchContainer(true);
					}}
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<div className={styles.layout_icons}>
					{/* {listData.map(data => (
						<span
							key={data.id}
							onClick={() => setActiveLayout(data.value)}
							data-active={activeLayout === data.value}
							data-type={data.value}
							className={styles.layout_icons__icon}
						>
							{data.icon}
						</span>
					))} */}
					<span
						onClick={() => setActiveLayout("list")}
						data-active={activeLayout === "list"}
						data-type={"list"}
						className={styles.layout_icons__icon}
					>
						<ListIcon color={activeLayout === "list" ? "#fff" : "#A3A7AB"} />
					</span>
					<span
						onClick={() => setActiveLayout("grid")}
						data-active={activeLayout === "grid"}
						data-type={"grid"}
						className={styles.layout_icons__icon}
					>
						<GridIcon color={activeLayout === "grid" ? "#fff" : "#A3A7AB"} />
					</span>
				</div>
			</div>
			{type && type !== "courses" ? (
				mappedListings?.length ? (
					<>
						{activeLayout === "list" ? (
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
										loading={isFetching}
									/>
								</div>

								<MobileCardContainer>
									{mappedListings?.map((item: any, ind: number) => (
										<ListingCardMob
											activeFilter={activeFilter.name.toLowerCase()}
											key={ind}
											item={item}
											ind={ind}
											refetch={refetch}
											onClickEdit={onClickEdit}
											onToggleHideListing={onToggleHideListing}
											lastEle={
												ind + 1 ===
												(type && type === "courses"
													? mappedCourses
													: mappedListings
												).length
													? true
													: false
											}
										/>
									))}
								</MobileCardContainer>
								{/* <div className={styles.btn_container}>
								<AddBtn onClick={handleAddItem} />
								</div> */}
							</>
						) : (
							<>
								<div className={styles.container__grid}>
									{mappedListings?.map((item: any) => (
										<ListingCard
											key={item.id}
											props={item}
											activeFilter={activeFilter}
											activeRow={selectedRow}
											setActiveRow={setSelectedRow}
											onClickEdit={onClickEdit}
											refetch={refetch}
											closePopOver={closePopOver}
											handleDelete={handleOpenDeleteModal}
											type={"listings"}
										/>
									))}
								</div>
							</>
						)}
					</>
				) : (
					<NoListings showCreateButton />
				)
			) : null}
			{type && type === "courses" ? (
				mappedCourses.length ? (
					<>
						{activeLayout === "list" ? (
							<>
								<div
									className={styles.container__table}
									style={{ width: "100%", height: "100%" }}
								>
									<DataGrid
										rows={
											type && type === "courses"
												? mappedCourses
												: mappedListings
										}
										columns={coursesColumns}
										hideFooterPagination={true}
										paginationMode="server"
										hideFooter
										autoHeight
										sx={customisedTableClasses}
										loading={isFetching}
									/>
								</div>

								<MobileCardContainer>
									{mappedCourses?.map((item: any, ind: number) => (
										<ListingCardMob
											activeFilter={activeFilter.name.toLowerCase()}
											key={ind}
											item={item}
											ind={ind}
											refetch={refetch}
											onClickEdit={onClickEdit}
											onToggleHideListing={onToggleHideListing}
											lastEle={
												ind + 1 ===
												(type && type === "courses"
													? mappedCourses
													: mappedListings
												).length
													? true
													: false
											}
										/>
									))}
								</MobileCardContainer>
								{/* <div className={styles.btn_container}>
								<AddBtn onClick={handleAddItem} />
								</div> */}
							</>
						) : (
							<>
								<div className={styles.container__grid}>
									{(type && type === "courses"
										? mappedCourses
										: mappedListings
									)?.map((item: any) => (
										<ListingCard
											key={item.id}
											props={item}
											activeFilter={activeFilter}
											activeRow={selectedRow}
											setActiveRow={setSelectedRow}
											onClickEdit={onClickEdit}
											refetch={refetch}
											closePopOver={closePopOver}
											handleDelete={handleOpenDeleteModal}
											type={"courses"}
										/>
									))}
								</div>
							</>
						)}
					</>
				) : (
					<NoListings showCreateButton type="courses" />
				)
			) : null}
			<Pagination
				currentPage={currentPage}
				totalCount={userListings?.meta?.total || 0}
				pageSize={10}
				onPageChange={(page: any) => updatePage(page)}
			/>
			{openModal && (
				<ConfirmPin
					openModal={openModal}
					setOpenModal={setOpenModal}
					onSuccess={onDeleteListing}
				/>
			)}
			{showSearchContainer && (
				<SearchListings
					setShowSearchContainer={setShowSearchContainer}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}
		</div>
	);
};

export default ListingTable;
