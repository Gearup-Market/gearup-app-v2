import type { Metadata } from "next";
import styles from "./layout.module.scss";
import { AdminNavbar, AdminSidebar } from "@/components/UserDashboard";
import {  ProtectRoute } from "@/contexts/AuthContext";

export const metadata: Metadata = {
	title: "Welcome to Gear Up",
	description: "Marketplace to get everything gears"
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
			<ProtectRoute>
				<main className={styles.main}>
					<div className={styles.body}>
						<div className={styles.body__left}>
							<AdminSidebar />
						</div>
						<div className={styles.body__right}>
							<AdminNavbar />
							<aside className={styles.body__right__main}>{children}</aside>
						</div>
					</div>
				</main>
			</ProtectRoute>
	);
}
