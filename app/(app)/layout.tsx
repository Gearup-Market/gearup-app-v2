import "@/styles/index.scss";
import styles from "./layout.module.scss";
import { Footer, Header } from "@/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "GearUp | The Peer-2-Peer Marketplace for African Creators",
	description:
		"GearUp connects African creators with opportunities to rent, buy, and sell creative gear, book studio spaces, access professional courses, and land gigs."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<head>
				<meta property="og:url" content="https://gearup.market/" />
				<meta
					property="og:title"
					content=" GearUp | The Peer-2-Peer Marketplace for African Creators"
				/>
				<meta
					property="og:description"
					content="GearUp connects African creators with opportunities to rent, buy, and sell creative gear, book studio spaces, access professional courses, and land gigs."
				/>
				<meta
					property="og:image"
					content="https://gearup.market/images/social-card.png"
				/>

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://gearup.market/" />
				<meta
					property="twitter:title"
					content=" GearUp | The Peer-2-Peer Marketplace for African Creators"
				/>
				<meta
					property="twitter:description"
					content="GearUp connects African creators with opportunities to rent, buy, and sell creative gear, book studio spaces, access professional courses, and land gigs."
				/>
				<meta
					property="twitter:image"
					content="https://gearup.market/images/social-card.png"
				/>
			</head>
			<Header />
			<main className={styles.main}>{children}</main>
			<Footer />
		</>
	);
}
