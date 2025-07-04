"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./UsersTable.module.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { MoreIcon, UserIcon } from "@/shared/svgs/dashboard";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import RecentDealsCard from "@/components/UserDashboard/Dashboard/Components/RecentDeals/components/RecentDealsCard/RecentDealsCard";
import { Button, InputField, MobileCardContainer, Pagination } from "@/shared";
import UserCardMob from "../UserCardMob/UserCardMob";
import { useGetAllKyc, useGetAllUsers } from "@/app/api/hooks/Admin/users";
import { debounce } from "lodash";
import { formatDate, formatTime } from "@/utils";
const sharedColDef: GridColDef = {
	field: "",
	sortable: true,
	flex: 1
};

interface Props {
	users?: any[];
	page: number;
	handlePagination: (page: number) => void;
	totalCount?: number;
	refetch: () => void;
	isLoading: boolean;
	pageSize: number;
}

const UsersTable = ({
	page,
	handlePagination,
	totalCount,
	users,
	refetch,
	isLoading,
	pageSize
}: Props) => {
	const [searchInput, setSearchInput] = useState("");

	const columns: GridColDef[] = [
		{
			...sharedColDef,
			field: "firstName",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Full name",
			minWidth: 250,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					<Image
						src={row?.userId?.avatar || "/svgs/user.svg"}
						alt={value}
						width={16}
						height={16}
					/>
					<p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
						{row?.firstName} {row?.lastName}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "email",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Email",
			minWidth: 200,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					<p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
						{row?.userId?.email}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "createdAt",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Created Date",
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__name_container}>
					<p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
						{value.split("T")[0]}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "isSubmitted",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Kyc submitted",
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__status_container}>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status}
						data-status={value}
					>
						{value ? "Yes" : "No"}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "isApproved",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Kyc Approved",
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__status_container}>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status}
						data-status={value}
					>
						{value ? "Yes" : "No"}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "isRejected",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Kyc Rejected",
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__status_container}>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status}
						data-status={value ? "declined" : false}
					>
						{value ? "Yes" : "No"}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "hasResubmitted",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Kyc Resubmitted",
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__status_container}>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status}
						data-status={value}
					>
						{value ? "Yes" : "No"}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "userId",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Actions",
			headerAlign: "center",
			minWidth: 200,
			renderCell: ({ value }) => (
				<Link
					href={`/admin/kyc/${value?._id}`}
					className={styles.container__action_btn}
				>
					<Button>View documents</Button>
				</Link>
			)
		}
	];

	useEffect(() => {
		refetch();
	}, [page, refetch]);

	const filteredUsers = useMemo(() => {
		if (!searchInput) return users;
		return users?.filter(
			user =>
				user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
				user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
				user.userId?.email.toLowerCase().includes(searchInput.toLowerCase())
		);
	}, [searchInput, users]);

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

	return (
		<div className={styles.container}>
			{!!users && users?.length < 1 ? (
				<div className={styles.empty_rows}>
					<span className={styles.transaction_icon}>
						<UserIcon color="#F76039" />
					</span>
					No data available
				</div>
			) : (
				<>
					<div className={styles.container__input_filter_container}>
						<InputField
							placeholder="Enter username or email"
							icon="/svgs/icon-search-dark.svg"
							iconTitle="search-icon"
							onChange={e => debouncedSearch(e.target.value)}
						/>
					</div>
					<div className={styles.container__table}>
						<DataGrid
							rows={filteredUsers || []}
							columns={columns}
							hideFooterPagination={true}
							hideFooter
							paginationMode="server"
							sx={customisedTableClasses}
							autoHeight
							scrollbarSize={20}
							loading={isLoading}
							getRowId={row => row._id}
						/>
					</div>
					<MobileCardContainer>
						{filteredUsers?.map((item, ind) => (
							<UserCardMob
								key={item._id}
								item={item}
								url="users"
								lastEle={ind + 1 === filteredUsers.length ? true : false}
								ind={ind}
							/>
						))}
					</MobileCardContainer>

					<Pagination
						currentPage={page}
						totalCount={totalCount || 0}
						pageSize={pageSize}
						onPageChange={(page: any) => handlePagination(page)}
					/>
				</>
			)}
		</div>
	);
};

export default UsersTable;
