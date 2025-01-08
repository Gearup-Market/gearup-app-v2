import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import Providers from "@/Providers";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

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
				<script
					async
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
				/>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<meta property="og:type" content="website" />
			</head>
			<body className={sourceSans.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
