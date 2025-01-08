"use client";

import { useGetArticleBySlug } from "@/app/api/hooks/blogs";
import { IGetArticle } from "@/app/api/hooks/blogs/types";
import { BlogDetailsView } from "@/views";
import React from "react";

const Page = ({ params }: { params: { slug: string } }) => {
	const { slug } = params;
	const { data, isLoading } = useGetArticleBySlug(slug as string);

	return (
		<>
			<head>
				<title>{data?.title}</title>
				<meta
					property="og:url"
					content={`https://gearup.market/blog/${data?.slug}`}
				/>
				<meta property="og:title" content={data?.title} />
				<meta property="og:image" content={data?.bannerImage} />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:url"
					content={`https://gearup.market/blog/${data?.slug}`}
				/>
				<meta property="twitter:title" content={data?.title} />
				<meta property="twitter:image" content={data?.bannerImage} />
			</head>
			<BlogDetailsView blogData={data as IGetArticle} isLoading={isLoading} />
		</>
	);
};

export default Page;
