import type { Metadata } from "next";
import styles from "./layout.module.scss";
import { AdminNavbar, AdminSidebar } from "@/components/Admin";
import Head from "next/head";
import { UrlPath } from "@/shared";
import {
	AdminAuthProvider,
	AdminProtectRoute
} from "@/contexts/AuthContext/AdminAuthContext";

export const metadata: Metadata = {
	title: "Welcome to Gear Up",
	description: "Marketplace to get everything gears"
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className={styles.main}>
			<AdminProtectRoute>
				<Head>
					<link
						rel="stylesheet"
						type="text/css"
						href="https://unpkg.com/trix@2.0.8/dist/trix.css"
					>
						<script
							defer
							type="text/javascript"
							src="https://unpkg.com/trix@2.0.8/dist/trix.umd.min.js"
						></script>
					</link>
				</Head>
				<div className={styles.body}>
					<div className={styles.body__left}>
						<AdminSidebar />
					</div>
					<div className={styles.body__right}>
						<AdminNavbar />
						<div className={styles.url_path}>
							<UrlPath checkUrl={true} />
						</div>

						<aside className={styles.body__right__main}>{children}</aside>
					</div>
				</div>
			</AdminProtectRoute>
		</main>
	);
}
