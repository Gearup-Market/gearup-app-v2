import React from "react";
import Head from "next/head";

interface Props {
	title?: string;
	description?: string;
	icon?: string;
	keywords?: string;
}

const Seo = ({
	title = "Deftify - Deftify",
	description = "Deftify Defi analytics aggregator",
	icon = "img/social-icon.png",
	keywords = "deftify, Defi, analytics",
}: Props) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="og:title" property="og:title" content={title} />
			<meta name="og:description" property="og:description" content={description} />
			<meta property="og:image" content={icon} />
			<meta name="keywords" content={keywords} />
			<meta property="og:url" content="" />
			<meta property="og:site_name" content="deftify" />
			<meta name="twitter:card" content="summary_large_image"></meta>
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<link rel="icon" href="/favicon.svg" />
			<link rel="apple-touch-icon" href="/favicon.svg" />
			<link rel="preconnect" href="https://fonts.gstatic.com/"></link>
			<link rel="preconnect" href="https://fonts.googleapis.com/"></link>
			<meta property="og:type" content="website" />
		</Head>
	);
};

export default Seo;
