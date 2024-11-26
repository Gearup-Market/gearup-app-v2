import styles from "./layout.module.scss";
import { AdminNavbar, AdminSidebar } from "@/components/UserDashboard";
import { ProtectRoute } from "@/contexts/AuthContext";

export default function UserLayout({ children }: { children: React.ReactNode }) {
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
