import type { Metadata } from "next";
import "@/styles/index.scss";
import styles from "./layout.module.scss";
import { Footer, Header } from "@/shared";

export const metadata: Metadata = {
	title: "Gear Up",
	description: "Marketplace to get everything gears"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</>
	);
}
