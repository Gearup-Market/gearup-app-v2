// /blog/[...slug]/page.tsx  (or wherever)

import { IGetArticle } from "@/app/api/hooks/blogs/types";
import { BlogDetailsView } from "@/views";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

interface ArticleRes {
	data: IGetArticle;
}
type SlugParam = string | string[];

// ---------- helpers ----------
const pickFirst = (v: SlugParam) => (Array.isArray(v) ? v[0] : v);

const isSlug = (v: SlugParam) => pickFirst(v).includes("-");

async function fetchArticle(idOrSlug: SlugParam): Promise<ArticleRes | null> {
	const value = pickFirst(idOrSlug);
	const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
	const prefix = isSlug(value) ? "slug/" : "";
	const url = `${baseURL}blog/${prefix}${encodeURIComponent(value)}`;

	try {
		const res = await fetch(url, { next: { revalidate: 60 } });
		if (!res.ok) return null;
		return res.json();
	} catch (err) {
		console.error("Error fetching article:", err);
		return null;
	}
}

// ---------- metadata ----------
export async function generateMetadata({
	params
}: {
	params: { slug: SlugParam };
}): Promise<Metadata> {
	const article = await fetchArticle(params.slug);
	const formatted = isSlug(params.slug) ? article?.data : article;

	if (!formatted) {
		return {
			title: "Blog Not Found",
			description: "The requested blog article could not be found."
		};
	}

	let articleData: IGetArticle;
	if ("data" in formatted) {
		articleData = formatted.data;
	} else {
		articleData = formatted;
	}

	const { title, metaDescription, slug, bannerImage } = articleData;
	const desc = metaDescription ?? `Read ${title} on GearUp Market`;
	const url = `https://gearup.market/blog/${slug}`;

	return {
		metadataBase: new URL("https://gearup.market"),
		title: { absolute: title },
		description: desc,
		openGraph: {
			type: "article",
			title: { absolute: title },
			description: desc,
			url,
			images: [{ url: bannerImage, width: 1200, height: 630, alt: title }],
			siteName: "GearUp Market"
		},
		twitter: {
			card: "summary_large_image",
			title: { absolute: title },
			description: desc,
			images: [bannerImage],
			site: "@gearupmarket"
		},
		robots: { index: true, follow: true },
		alternates: { canonical: url }
	};
}

export default async function Page({ params }: { params: { slug: SlugParam } }) {
	const article = await fetchArticle(params.slug);
	if (!article) notFound();

	let articleData: IGetArticle;
	if ("data" in article) {
		articleData = article.data;
	} else {
		articleData = article;
	}

	if (!isSlug(params.slug)) {
		redirect(`/blog/${articleData.slug}`);
	}

	return <BlogDetailsView blogData={articleData} />;
}
