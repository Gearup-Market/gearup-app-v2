import "@/styles/index.scss";
import styles from "./layout.module.scss";
import { Footer, Header } from "@/shared";
import { Suspense } from "react";
import { Box } from "@mui/material";
import { CircularProgressLoader } from "@/shared/loaders";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<Suspense
				fallback={
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100vh"
						}}
					>
						<CircularProgressLoader color="#FFB30F" />
					</Box>
				}
			>
				<main className={styles.main}>{children}</main>
			</Suspense>
			<Footer />
		</>
	);
}
