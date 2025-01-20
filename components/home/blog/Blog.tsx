"use client";
import React from "react";
import styles from "./Blog.module.scss";
import { CustomImage, InputField } from "@/shared";
import { blogsData } from "@/mock/blogs.mock";
import Link from "next/link";
import slugify from "slugify";
import { useGetAllArticles } from "@/app/api/hooks/blogs";
import { shortenTitle } from "@/utils";
import Image from "next/image";

const Blog = () => {
	const { data: blogsResp, isLoading: fetchingRecommended } = useGetAllArticles();
	const blogs = blogsResp?.data || [];
	return (
		<div className={styles.container}>
			<div className={styles.container__hero_section}>
				<div className={styles.container__hero_section__content}>
					<h1 className={styles.container__hero_section__content__title}>
						Our Blog
					</h1>
					<p className={styles.container__hero_section__content__description}>
						Learn more about Renting, buying, or selling gears from local
						creators
					</p>
					<InputField
						icon="/svgs/icon-search-dark.svg"
						placeholder="Search for articles"
						className={styles.container__hero_section__content__search_field}
					/>
				</div>
			</div>

			<div className={styles.container__blogs_section}>
				{blogs.map((blog, index) => (
					<div key={index} className={styles.container__blogs_section__blog}>
						<div className={styles.banner_image}>
							<CustomImage
								fill
								src={blog.bannerImage}
								alt={blog.title}
								className={styles.container__blogs_section__blog__image}
							/>
						</div>
						<ul className={styles.tags_container}>
							<li className={styles.tag}>{blog.category.name}</li>
						</ul>
						<div className={styles.container__blogs_section__blog__content}>
							<h2
								className={
									styles.container__blogs_section__blog__content__title
								}
							>
								{blog.title}
							</h2>
							<p
								className={
									styles.container__blogs_section__blog__content__description
								}
							>
								<p
									dangerouslySetInnerHTML={{
										__html: shortenTitle(blog.content.text, 100) ?? ""
									}}
								/>
							</p>
						</div>

						<Link href={`/blog/${blog.slug}`} className={styles.learn_more}>
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
				))}
			</div>
		</div>
	);
};

export default Blog;
