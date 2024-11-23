import type { Metadata } from "next";
import styles from "./layout.module.scss";
import { ProtectRoute } from "@/contexts/AuthContext";

export const metadata: Metadata = {
	title: "Create a Listing",
	description: "Marketplace to get everything gears"
};

export default function ListingLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectRoute>
			<main className={styles.main}>{children}</main>
		</ProtectRoute>
	);
}
