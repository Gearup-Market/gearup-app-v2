import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import Providers from "@/Providers";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: " GearUp | The Peer-2-Peer Marketplace for African Creators",
	description:
		"GearUp connects African creators with opportunities to rent, buy, and sell creative gear, book studio spaces, access professional courses, and land gigs."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				{/* <Script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=G-BSE4C66ZHZ`}
				></Script>
				<Script id="gtag">
					{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
    
                gtag('config', 'G-BSE4C66ZHZ');
            `}
				</Script> */}
				{/* <meta
					name="google-site-verification"
					content="Z9wM7qen8ZcGMvJLxRsK_PbpRFsla2POZgNiM_DBaWI"
				/> */}
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<meta property="og:type" content="website" />
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
			<body className={sourceSans.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
