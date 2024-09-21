import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import styles from "./layout.module.scss";
import { Footer, Header } from "@/shared";

import { AppProvider } from "@/contexts/AppContext";

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
