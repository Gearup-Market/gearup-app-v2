'use client'
    ; import React from 'react'
import styles from './blogDetails.module.scss'
import { BackNavigation, CustomImage } from '@/shared'
import Image from 'next/image'
import { recommendedBlogs } from '@/mock/recommendedBlogs.mock'
import { useGetArticleById } from '@/app/api/hooks/blogs'
import { Box } from '@mui/material';
import { CircularProgressLoader } from '@/shared/loaders';

interface Props {
    slug: string
}

const BlogDetails = ({ slug }: Props) => {
    const { data, isLoading } = useGetArticleById(slug as string)
    console.log(data,"data")

    if(isLoading){
        return (
            <Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh"
				}}
			>
				<CircularProgressLoader color="#FFB30F"  />
			</Box>
        )
    }

    return (
        <div className={styles.container_wrapper}>
            <div className={styles.container}>
                <BackNavigation />
                <article>
                    <div className={styles.blog_main_img}>
                        <CustomImage fill src={data?.bannerImage ?? "/svgs/blogdetail-mi.svg"} alt="hero" />
                    </div>
                    <div className={styles.tags_time_container}>
                        <ul className={styles.tags_container}>
                            <li className={styles.tag}>Market analysis</li>
                        </ul>
                        <span className={styles.time_container}><Image src="/svgs/clock.svg" alt='clock' height={20} width={20} /> <p className={styles.item}> {data?.readMinutes} mins Read</p></span>
                    </div>
                    <div className={styles.blog_content}>
                        <div dangerouslySetInnerHTML={{ __html: data?.content?.text ?? "" }} />
                    </div>
                </article>
            </div>
            <aside className={styles.recommended_section_container}>
                <h2 className={styles.recommended_title}>Recommended for you</h2>
                <ul className={styles.recommended_blogs_section}>
                    {
                        recommendedBlogs.map((blog, index) => (
                            <li key={index}>
                                <div className={styles.recommended_blog}>
                                    <div className={styles.blog_recommended_img}>
                                        <CustomImage width={400} height={450} src={blog.image} alt={blog.title} />
                                    </div>
                                    <div className={styles.tags_time_container}>
                                        <ul className={styles.tags_container}>
                                            <li className={styles.tag}>Market analysis</li>
                                        </ul>
                                        <span className={styles.time_container}><Image src="/svgs/clock.svg" alt='clock' height={20} width={20} /> <p className={styles.item}> 5 mins Read</p></span>
                                    </div>
                                    <div className={styles.recommended_blog_content}>
                                        <h2 className={styles.blog_title}>{blog.title}</h2>
                                        <p className={styles.blog_preview}>{blog.preview}</p>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </aside>
        </div>
    )
}

export default BlogDetails