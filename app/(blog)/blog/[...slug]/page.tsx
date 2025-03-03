import { IGetArticle } from "@/app/api/hooks/blogs/types";
import { BlogDetailsView } from "@/views";
import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";

export interface Props {
	data: IGetArticle;
}

const isSlug = (idOrSlug: string) => {
	return idOrSlug[0].includes("-");
};

async function getArticleBySlug(slug: string): Promise<Props | null> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${
				isSlug(slug) ? "slug/" : ""
			}${slug}`,
			{
				cache: "no-cache",
				next: { tags: ["blog-article"] }
			}
		);

		if (!res.ok) return null;

		return res.json();
	} catch (error) {
		console.error("Error fetching article:", error);
		return null;
	}
}

export async function generateMetadata({
	params
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const article = await getArticleBySlug(params.slug);
	const formattedArticle: any = isSlug(params.slug) ? article?.data : article;

	if (!article || !formattedArticle) {
		return {
			title: "Blog Not Found",
			description: "The requested blog article could not be found."
		};
	}

	const title = formattedArticle.title;
	const description =
		formattedArticle.excerpt ||
		formattedArticle.description ||
		`Read ${title} on GearUp Market`;
	const url = `https://gearup.market/blog/${formattedArticle.slug}`;
	const imageUrl = formattedArticle.bannerImage;

	return {
		metadataBase: new URL("https://gearup.market"),
		title: {
			absolute: title
		},
		description,

		openGraph: {
			type: "article",
			title: {
				absolute: title
			},
			description,
			url,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: title
				}
			],
			siteName: "GearUp Market"
		},

		twitter: {
			card: "summary_large_image",
			title: {
				absolute: title
			},
			description,
			images: [imageUrl],
			site: "@gearupmarket"
		},

		robots: {
			index: true,
			follow: true
		},

		alternates: {
			canonical: url
		}
	};
}

export default async function Page({ params }: { params: { slug: string } }) {
	const article: any = await getArticleBySlug(params.slug);

	if (!article) notFound();

	if (!isSlug(params.slug)) {
		redirect(`/blog/${article.slug}`);
	}

	return <BlogDetailsView blogData={isSlug(params.slug) ? article?.data : article} />;
}
