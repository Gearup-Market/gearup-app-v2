"use client";
import React, { useState } from "react";
import styles from "./Users.module.scss";
import Image from "next/image";
import { UsersTable } from "./components";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import { useGetAllKyc, useGetAllKycUnpaginated } from "@/app/api/hooks/Admin/users";
import { Button } from "@/shared";
import { formatDate } from "@/utils";
import { formatTime } from "@/utils";
import toast from "react-hot-toast";

const Users = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading, refetch, isFetching } = useGetAllKyc(page);
	const { data: unpaginatedData, isFetching: isFetchingUnpaginated } =
		useGetAllKycUnpaginated();

	const handlePagination = (page: number) => {
		setPage(page);
	};

	const downloadCSV = () => {
		if (isFetchingUnpaginated || !unpaginatedData)
			return toast.error("Fetching data...");

		const escapeCSV = (value: any) => {
			const str = String(value ?? "");
			// Wrap in double quotes and escape any internal double quotes
			return `"${str.replace(/"/g, '""')}"`;
		};

		const headers = [
			"First Name",
			"Last Name",
			"Email",
			"Phone Number",
			"Address",
			"City",
			"Country",
			"Postal Code",
			"Created Date",
			"Kyc submitted",
			"Kyc Approved"
		];
		const rows = unpaginatedData?.data?.map(row => [
			row.firstName,
			row.lastName,
			row.userId.email,
			row.phoneNumber,
			row.address,
			row.city,
			row.country,
			row.postalCode,
			`${formatDate(row.createdAt)}/${formatTime(row.createdAt)}`,
			row.isSubmitted ? "Yes" : "No",
			row.isApproved ? "Yes" : "No"
		]);

		const escapedContent = [
			headers.map(escapeCSV).join(","),
			...rows.map(row => row.map(escapeCSV).join(","))
		].join("\n");
		const blob = new Blob([escapedContent], { type: "text/csv;charset=utf-8;" });

		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "Gearup-kyc-data.csv";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__item}>
				<div className={styles.container__item__left}>
					<Image
						src="/svgs/user-icon-colored.svg"
						alt="icon"
						width={40}
						height={40}
					/>
					<div>
						<p className={styles.title}>Total KYC Submitted</p>
						<p className={styles.amount}>{data?.meta?.total || 0}</p>
					</div>
				</div>
			</div>
			<div className={styles.row}>
				<HeaderSubText title="All KYC Submitted" />
				<Button onClick={downloadCSV}>Download CSV</Button>
			</div>

			<UsersTable
				page={page}
				handlePagination={handlePagination}
				totalCount={data?.meta?.total || 0}
				refetch={refetch}
				isLoading={isLoading}
				pageSize={data?.meta?.limit || 0}
				users={data?.data || []}
			/>
		</div>
	);
};

export default Users;
