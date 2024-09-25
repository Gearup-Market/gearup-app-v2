import React from 'react'
import styles from './Blog.module.scss'
import { CustomImage, InputField } from '@/shared'
import { blogsData } from '@/mock/blogs.mock'
import Link from 'next/link'
import slugify from 'slugify'

const Blog = () => {
    return (
        <div className={styles.container}>
            <div className={styles.container__hero_section}>
                <div className={styles.container__hero_section__content}>
                    <h1 className={styles.container__hero_section__content__title}>Our Blog</h1>
                    <p className={styles.container__hero_section__content__description}>Learn more about Renting, buying, or selling gears from local creators</p>
                    <InputField icon='/svgs/icon-search-dark.svg' placeholder="Search for articles" className={styles.container__hero_section__content__search_field} />
                </div>
            </div>

            <div className={styles.container__blogs_section}>
                {
                    blogsData.map((blog, index) => (
                        <div key={index} className={styles.container__blogs_section__blog}>
                            <CustomImage height={200} width={400} src={"https://plus.unsplash.com/premium_photo-1663050714985-25d0b31fb7b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWR1Y2F0aW9uJTIwYmxvZyUyMGltYWdlfGVufDB8fDB8fHww"} alt={blog.title} className={styles.container__blogs_section__blog__image} />
                            <ul className={styles.tags_container}>
                                <li className={styles.tag}>{blog.category}</li>
                            </ul>
                            <div className={styles.container__blogs_section__blog__content}>
                                <h2 className={styles.container__blogs_section__blog__content__title}>{blog.title}</h2>
                                <p className={styles.container__blogs_section__blog__content__description}>{blog.preview_text}</p>
                            </div>

                            <Link href={`/blog/${slugify(blog.title, {
                                replacement: '-',
                                lower: true,
                            })}`} className={styles.learn_more}>
                                <p className={styles.text}>Learn more</p> <span className={styles.icon}> <CustomImage height={20} width={20} src="/svgs/ArrowLeft.svg" alt="arrow-right" className={styles.image_arrow} /></span>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Blog