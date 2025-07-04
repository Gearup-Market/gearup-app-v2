import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/styles/index.scss";
import Providers from "@/Providers";
import Script from "next/script";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

// export const metadata: Metadata = {
// 	// title: {
// 	// 	template: "GearUp | %s",
// 	// 	default: "The Peer-2-Peer Marketplace for African Creators"
// 	// },
// 	title: "GearUp | The Peer-2-Peer Marketplace for African Creators",
// 	description:
// 		"GearUp connects African creators with opportunities to rent, buy, and sell creative gear, book studio spaces, access professional courses, and land gigs."
// };

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
				<head>
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-WDQ59KDMS6"
					></script>
					<Script id="gtag">
						{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
    
                gtag('config', 'G-WDQ59KDMS6');
            `}
					</Script>
					<Script
						id="google-tag-manager"
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K99BQVGP');
        `
						}}
					/>

					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "WebSite",
								name: "GearUp",
								url: "https://gearup.market"
							})
						}}
					/>

					<script
						async
						src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
					/>
					<link rel="icon" href="/favicon.png" sizes="any" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://gearup.market/" />
					{/* <meta
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
					/> */}
				</head>
			</head>
			<body className={sourceSans.className}>
				<Providers>{children}</Providers>
			</body>
			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/ns.html?id=GTM-K99BQVGP`}
					height="0"
					width="0"
					style={{ display: "none", visibility: "hidden" }}
				></iframe>
			</noscript>
		</html>
	);
}
