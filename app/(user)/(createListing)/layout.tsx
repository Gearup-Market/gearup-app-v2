"use client";

import { useAppSelector } from "@/store/configureStore";
import styles from "./layout.module.scss";
import { ProtectRoute } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ListingLayout({ children }: { children: React.ReactNode }) {
	const verification = useAppSelector(s => s.verification);
	const user = useAppSelector(s => s.user);
	const router = useRouter();
	useEffect(() => {
		if (user.isAuthenticated && !verification.isApproved) {
			toast.error("Please complete your KYC");
			router.replace("/verification");
		}
	}, [verification.isApproved, user.isAuthenticated, router]);
	return (
		<ProtectRoute>
			<main className={styles.main}>{children}</main>
		</ProtectRoute>
	);
}
