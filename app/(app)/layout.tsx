import "@/styles/index.scss";
import styles from "./layout.module.scss";
import { Footer, Header } from "@/shared";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</>
	);
}
