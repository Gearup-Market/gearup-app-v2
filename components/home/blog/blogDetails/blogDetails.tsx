"use client";
import React from "react";
import styles from "./blogDetails.module.scss";
import { BackNavigation, CustomImage } from "@/shared";
import Image from "next/image";
import {
	useGetAllRecommendedArticles,
	useGetArticleById,
	useGetArticleBySlug
} from "@/app/api/hooks/blogs";
import { Box } from "@mui/material";
import { CircularProgressLoader } from "@/shared/loaders";
import { shortenTitle } from "@/utils";
import { IGetArticle } from "@/app/api/hooks/blogs/types";
import Link from "next/link";

interface Props {
	data: IGetArticle;
}

const BlogDetails = ({ data }: Props) => {
	// const blogId = slug[0].split("-").pop();
	// const { data, isLoading } = useGetArticleBySlug(slug as string);
	const { data: recommendedBlogsResp, isLoading: fetchingRecommended } =
		useGetAllRecommendedArticles();
	const recommendedBlogs = recommendedBlogsResp?.data || [];

	// if (isLoading) {
	// 	return (
	// 		<Box
	// 			sx={{
	// 				display: "flex",
	// 				justifyContent: "center",
	// 				alignItems: "center",
	// 				height: "100vh"
	// 			}}
	// 		>
	// 			<CircularProgressLoader color="#F76039" />
	// 		</Box>
	// 	);
	// }

	return (
		<div className={styles.container_wrapper}>
			<div className={styles.container}>
				<BackNavigation />
				<article>
					<div className={styles.blog_main_img}>
						<CustomImage
							fill
							src={data?.bannerImage ?? "/svgs/blogdetail-mi.svg"}
							alt="hero"
						/>
					</div>
					<div className={styles.tags_time_container}>
						<ul className={styles.tags_container}>
							<li className={styles.tag}>{data?.category?.name}</li>
						</ul>
						<span className={styles.time_container}>
							<Image
								src="/svgs/clock.svg"
								alt="clock"
								height={20}
								width={20}
							/>{" "}
							<p className={styles.item}> {data?.readMinutes} mins Read</p>
						</span>
					</div>
					<div className={styles.blog_content}>
						<div className={styles.title}>
							<h1>{data?.title}</h1>
						</div>
						<div
							dangerouslySetInnerHTML={{
								__html: data?.content?.text ?? ""
							}}
						/>
					</div>
				</article>
			</div>
			<aside className={styles.recommended_section_container}>
				<h2 className={styles.recommended_title}>Recommended for you</h2>
				<ul className={styles.recommended_blogs_section}>
					{recommendedBlogs?.slice(0, 3)?.map((blog, index) => (
						<li key={index}>
							<div className={styles.recommended_blog}>
								<div className={styles.blog_recommended_img}>
									<CustomImage
										width={400}
										height={350}
										src={blog?.bannerImage ?? ""}
										alt={blog.title}
									/>
								</div>
								<div className={styles.tags_time_container}>
									<ul className={styles.tags_container}>
										<li className={styles.tag}>
											{blog?.category?.name}
										</li>
									</ul>
									<span className={styles.time_container}>
										<Image
											src="/svgs/clock.svg"
											alt="clock"
											height={20}
											width={20}
										/>{" "}
										<p className={styles.item}>
											{" "}
											{blog?.readMinutes || 0} mins Read
										</p>
									</span>
								</div>
								<div className={styles.recommended_blog_content}>
									<h2 className={styles.blog_title}>{blog.title}</h2>
									<p className={styles.blog_preview}>
										<p
											dangerouslySetInnerHTML={{
												__html:
													shortenTitle(
														blog.content.text,
														600
													) ?? ""
											}}
										/>
									</p>
								</div>
								<Link
									href={`/blog/${blog.slug}`}
									className={styles.learn_more}
								>
									<p className={styles.text}>Learn more</p>{" "}
									<span className={styles.icon}>
										{" "}
										<Image
											height={20}
											width={20}
											src="/svgs/learn-more-arrow.svg"
											alt="arrow-right"
											className={styles.image_arrow}
										/>
									</span>
								</Link>
							</div>
						</li>
					))}
				</ul>
			</aside>
		</div>
	);
};

export default BlogDetails;
