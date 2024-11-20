"use client";
import React, { useState } from "react";
import styles from "./Dashboard.module.scss";
import { CardsSection, PendingListing } from "./Components";
import { UsersTable } from "../Users/components";
import { usersData } from "@/mock/users.mock";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import { GridRowsProp } from "@mui/x-data-grid";

const Dashboard = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [paginatedData, setPaginatedData] = useState<GridRowsProp>(
		usersData.slice(0, limit)
	);

	const handlePagination = (page: number) => {
		const start = (page - 1) * limit;
		const end = start + limit;
		setPaginatedData(usersData.slice(start, end));
		setPage(page);
	};

	return (
		<div className={styles.container}>
			{/* <PendingListing /> */}
			<CardsSection />
			<HeaderSubText title="Recent Users" />
			<UsersTable
				users={paginatedData}
				page={page}
				limit={limit}
				handlePagination={handlePagination}
				url="dashboard"
				totalCount={usersData.length}
			/>
		</div>
	);
};

export default Dashboard;
