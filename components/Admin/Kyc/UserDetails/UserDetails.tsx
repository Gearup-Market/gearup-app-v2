"use client";
import React, { useMemo } from "react";
import styles from "./UserDetails.module.scss";
import { About, DashboardUserHeader, Documents } from "./components";
import { TransactionsView } from "@/views/AdminViews";
import ListingsView from "@/views/AdminViews/Listings";
import { ChevronIcon } from "@/shared/svgs/dashboard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useGetUser, useGetUserDetails } from "@/app/api/hooks/users";
import { PageLoader } from "@/shared/loaders";
import { useGetKyc } from "@/app/api/hooks/Admin/users";

const DashboardUserComponent = ({ slug }: { slug: string }) => {
	const pathname = usePathname();
	const router = useRouter();
	const userId = useMemo(
		() => pathname.split("/")[pathname.split("/").length - 1],
		[pathname]
	);
	const { data: userData, isLoading: userLoading } = useGetUserDetails({ userId });
	const { data: kycData, isLoading: kycLoading } = useGetKyc({ userId });

	const handleBack = () => {
		router.back();
	};

	const newPathname = pathname.split("/")[2].replace(/-/g, " ");

	return (
		<div className={styles.container}>
			{newPathname.toLowerCase() === "dashboard" && (
				<div className={styles.breadcrumbs}>
					<Link href={"/admin/dashboard"}>Dashboard</Link>
					<span className={styles.icon}>
						<ChevronIcon color="#A3A7AB" />
					</span>
					<p>user</p>
				</div>
			)}
			{newPathname.toLowerCase() === "users" && (
				<div className={styles.nav_container} onClick={handleBack}>
					<span className={styles.icon}>
						<ChevronIcon color="#4E5054" />
					</span>
					<p>Back</p>
				</div>
			)}
			{userLoading && kycLoading ? (
				<PageLoader />
			) : (
				<div className={styles.about_document}>
					<DashboardUserHeader data={userData?.data} kycData={kycData?.data} />
					<Documents data={userData?.data} kycData={kycData?.data} />
				</div>
			)}
		</div>
	);
};

export default DashboardUserComponent;
