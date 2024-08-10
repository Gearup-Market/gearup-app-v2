"use client";
import React, { useState } from "react";
import styles from "./ListingTable.module.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { Button, InputField, MobileCardContainer, ToggleSwitch } from "@/shared";
import { MoreIcon } from "@/shared/svgs/dashboard";
import { GridIcon, ListIcon } from "@/shared/svgs/dashboard";
import ListingCard from "../ListingCard/ListingCard";
import MoreModal from "../MoreModal/MoreModal";
import { customisedTableClasses } from "@/utils/classes";
import Pagination from "../../../../../shared/pagination/Pagination";
import RecentDealsCard from "@/components/UserDashboard/Dashboard/Components/RecentDeals/components/RecentDealsCard/RecentDealsCard";
import Link from "next/link";
import ListingCardMob from "./ListingCarMob/ListingCarMob";

const ListingTable = () => {
	const [activeLayout, setActiveLayout] = useState("list");
	const [activeRow, setActiveRow] = useState<number | null>(null);
	const [showMoreModal, setShowMoreModal] = useState(false);
	const [page, setPage] = useState(1);
	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1,
	};
	const rows: GridRowsProp = [
		{
			id: 1,
			title: "Canon EOS R5 Camera Kit",
			price: "$200",
			transaction_date: "15 Dec, 2023",
			type: "Rental",
			status: "Declined",
			actions: "View",
			image: "https://images.unsplash.com/photo-1608538770329-65941f62f9f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
			availability: "rented out",
			date: "15 Dec, 2023",
			category: "Microphone",
		},
		{
			id: 2,
			title: "Canon EOS R5 Camera Kit",
			price: "$200",
			transaction_date: "15 Dec, 2023",
			type: "Rental",
			status: "ongoing",
			actions: "View",
			image: "https://images.unsplash.com/photo-1608538770329-65941f62f9f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
			availability: "Active listing",
			date: "15 Dec, 2023",
			category: "Camera",
		},
		{
			id: 3,
			title: "Canon EOS R5 Camera Kit",
			price: "$200",
			transaction_date: "15 Dec, 2023",
			type: "Rental",
			status: "Completed",
			actions: "View",
			image: "https://images.unsplash.com/photo-1597183739841-5ca26ab0a604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
			availability: "hidden",
			date: "15 Dec, 2023",
			category: "Camera",
		},
		{
			id: 4,
			title: "Canon EOS R5 Camera Kit",
			price: "$200",
			transaction_date: "15 Dec, 2023",
			type: "Rental",
			status: "ongoing",
			actions: "View",
			image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
			availability: "rented out",
			date: "15 Dec, 2023",
			category: "Speaker",
		},
		{
			id: 5,
			title: "Canon EOS R5 Camera Kit",
			price: "$200",
			transaction_date: "15 Dec, 2023",
			type: "Rental",
			status: "Declined",
			actions: "View",
			image: "https://plus.unsplash.com/premium_photo-1677159499898-b061fb5bd2d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
			availability: "hidden",
			date: "15 Dec, 2023",
			category: "Camera",
		},
		{
			id: 6,
			title: "Canon EOS R5 Camera Kit",
			price: "$200",
			transaction_date: "15 Dec, 2023",
			type: "Rental",
			status: "Completed",
			actions: "View",
			image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
			availability: "active listing",
			date: "15 Dec, 2023",
			category: "Camera",
		},
	];

	const columns: GridColDef[] = [
		{
			...sharedColDef,

			field: "title",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Product Name",
			minWidth: 250,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					<Image src={row.image} alt={value} width={16} height={16} />
					<p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
						{value}
					</p>
				</div>
			),
		},
		{
			...sharedColDef,

			field: "category",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Category",
			minWidth: 100,
		},
		{
			...sharedColDef,

			field: 'date',
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: 'Date',
			minWidth: 150,
		},
		{
			...sharedColDef,

			field: 'price',
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: 'Price',
			minWidth: 150,
		},
		{
			...sharedColDef,

			field: 'status',
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: 'Status',
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__status_container}>
					<p style={{ fontSize: '1.2rem' }} className={styles.container__status_container__status}>
						{value}
					</p>
				</div>
			),
		},
		{
			...sharedColDef,

			field: 'actions',
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: 'Actions',
			headerAlign: 'center',
			align: 'center',
			minWidth: 150,
			renderCell: ({ row, value }) => (
				<Link
					href={`/admin/listings/${row.id}?&user_role=${row.user_role}&third_party=${row.third_party_verification}&timeElapsed=${row.timeElapsed}`}
					className={styles.container__action_btn}
				>
					<Button>View details</Button>
				</Link>
			),
		},
	];

	const handleClickMore = (id: number) => {
		console.log('More clicked', id)
		setShowMoreModal((prev) => !prev)
		setActiveRow(id)
	};

	const listData = [
		{
			id: 1,
			icon: <ListIcon />,
			value: "list",
		},
		{
			id: 2,
			icon: <GridIcon />,
			value: "grid",
		},
	];

	return (
		<div className={styles.container}>
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
							rows={rows}
							columns={columns}
							hideFooterPagination={true}
							paginationMode="server"
							hideFooter
							autoHeight
							sx={customisedTableClasses}
						/>

					</div>

					<MobileCardContainer>

						{rows.map((item, ind) => (
							<ListingCardMob key={item.id} item={item} ind={ind} lastEle={(ind + 1) === rows.length ? true : false} />
						))}
					</MobileCardContainer>

				</>
			) : (
				<div className={styles.container__grid}>
					{rows.map(item => (
						<Link key={item.id} href={`/admin/listings/${item.id}`}><ListingCard key={item.id} props={item} /></Link>
					))}
				</div>
			)}
			<Pagination
				currentPage={1}
				onPageChange={setPage}
				totalCount={rows.length}
				pageSize={5}
			/>
		</div>
	);
};

export default ListingTable;
