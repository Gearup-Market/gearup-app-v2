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
import { useGetAllUsers } from "@/app/api/hooks/Admin/users";
import { debounce } from "lodash";
const sharedColDef: GridColDef = {
	field: "",
	sortable: true,
	flex: 1
};

interface Props {
	users?: GridRowsProp;
	page: number;
	limit: number;
	handlePagination: (page: number) => void;
	url?: string;
	totalCount?: number;
}

const UsersTable = ({ page, limit, handlePagination, url, totalCount }: Props) => {
	const { data, isLoading } = useGetAllUsers();
	const [currentPage, setCurrentPage] = useState<number>(1);
	// const [users, setUsers] = useState<any[]>(data?.data || []);
	const [searchInput, setSearchInput] = useState("");
	const pageSize: number = 12;
	const users = data?.data || [];

	const columns: GridColDef[] = [
		{
			...sharedColDef,
			field: "userName",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Username",
			minWidth: 250,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					<Image
						src={row.avatar || "/svgs/user.svg"}
						alt={value}
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
			field: "email",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Email",
			minWidth: 200
		},
		{
			...sharedColDef,
			field: "createdAt",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Joined Date",
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
			field: "isActive",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Account status",
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__status_container}>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.container__status_container__status}
						data-status={value}
					>
						{value ? "Active" : "In-active"}
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
					href={`/admin/${url}/${value}`}
					onClick={() => handleClickMore(value)}
					className={styles.container__action_btn}
				>
					<Button>View Profile</Button>
				</Link>
			)
		}
	];

	const filteredUsers = useMemo(() => {
		if (!searchInput) return users;
		return users.filter(
			user =>
				user.userName.toLowerCase().includes(searchInput.toLowerCase()) ||
				user.email.toLowerCase().includes(searchInput.toLowerCase())
		);
	}, [searchInput, users]);

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

	const handleClickMore = (id: number) => {
		console.log("More clicked", id);
	};

	return (
		<div className={styles.container}>
			{!!users && users?.length < 1 ? (
				<div className={styles.empty_rows}>
					<span className={styles.transaction_icon}>
						<UserIcon color="#FFB30F" />
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
							rows={currentTableData || []}
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
						{currentTableData?.map((item, ind) => (
							<UserCardMob
								key={item._id}
								item={item}
								url="users"
								lastEle={
									ind + 1 === currentTableData.length ? true : false
								}
								ind={ind}
							/>
						))}
					</MobileCardContainer>

					<Pagination
						// currentPage={page}
						// onPageChange={handlePagination}
						// totalCount={totalCount || 0}
						// pageSize={limit}
						currentPage={currentPage}
						totalCount={users?.length}
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

export default UsersTable;
