import type { Metadata } from "next";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
	title: "Create a Listing",
	description: "Marketplace to get everything gears"
};

export default function ListingLayout({ children }: { children: React.ReactNode }) {
	return <main className={styles.main}>{children}</main>;
}
