// "use client";

// import { useGetArticleBySlug } from "@/app/api/hooks/blogs";
// import { IGetArticle } from "@/app/api/hooks/blogs/types";
// import { BlogDetailsView } from "@/views";
// import React from "react";

// const Page = ({ params }: { params: { slug: string } }) => {
// 	const { slug } = params;
// 	const { data, isLoading } = useGetArticleBySlug(slug as string);

// 	return (
// 		<>
// 			<head>
// 				<title>{data?.title}</title>
// 				<meta
// 					property="og:url"
// 					content={`https://gearup.market/blog/${data?.slug}`}
// 				/>
// 				<meta property="og:title" content={data?.title} />
// 				<meta property="og:image" content={data?.bannerImage} />

// 				{/* Twitter */}
// 				<meta property="twitter:card" content="summary_large_image" />
// 				<meta
// 					property="twitter:url"
// 					content={`https://gearup.market/blog/${data?.slug}`}
// 				/>
// 				<meta property="twitter:title" content={data?.title} />
// 				<meta property="twitter:image" content={data?.bannerImage} />
// 			</head>
// 			<BlogDetailsView blogData={data as IGetArticle} isLoading={isLoading} />
// 		</>
// 	);
// };

// export default Page;

import { IGetArticle } from "@/app/api/hooks/blogs/types";
import { BlogDetailsView } from "@/views";
import { notFound, redirect } from "next/navigation";

export interface Props {
	data: IGetArticle;
}

const isSlug = (idOrSlug: string) => {
	return idOrSlug[0].includes("-");
};

async function getArticleBySlug(slug: string): Promise<Props | null> {
	console.log(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/blog/${
			isSlug(slug) ? "slug/" : null
		}${slug}`
	);
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/blog/${
			isSlug(slug) ? "slug/" : ""
		}${slug}`,
		{
			cache: "no-cache"
		}
	);

	if (!res.ok) return null;

	return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
	const article = await getArticleBySlug(params.slug);
	const formattedArticle: any = isSlug(params.slug) ? article?.data : article;

	if (!article) {
		return {
			title: "Blog Not Found"
		};
	}

	return {
		title: formattedArticle?.title,
		openGraph: {
			url: `https://gearup.market/blog/${formattedArticle?.slug}`,
			title: formattedArticle?.title,
			images: formattedArticle?.bannerImage
		},
		twitter: {
			card: "summary_large_image",
			url: `https://gearup.market/blog/${formattedArticle?.slug}`,
			title: formattedArticle?.title,
			images: formattedArticle?.bannerImage
		}
	};
}

export default async function Page({ params }: { params: { slug: string } }) {
	const article: any = await getArticleBySlug(params.slug);

	if (!article) notFound();

	if (!isSlug(params.slug)) {
		redirect(`/blog/${article.slug}`);
	}

	return (
		<BlogDetailsView
			blogData={isSlug(params.slug) ? article?.data : (article as any)}
		/>
	);
}
