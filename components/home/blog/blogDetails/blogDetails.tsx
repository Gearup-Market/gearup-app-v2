import React from 'react'
import styles from './blogDetails.module.scss'
import { BackNavigation, CustomImage } from '@/shared'
import Image from 'next/image'
import { blogContent, recommendedBlogs } from '@/mock/recommendedBlogs.mock'
import SyntaxHighlighter from 'react-syntax-highlighter';

interface Props {
    slug: string
}

const BlogDetails = ({ slug }: Props) => {
    return (

        <div className={styles.container_wrapper}>
            <div className={styles.container}>
                <BackNavigation />
                <article>
                    <div className={styles.blog_main_img}>
                        <CustomImage width={840} height={400} src="/svgs/blogdetail-mi.svg" alt="hero" />
                    </div>
                    <div className={styles.tags_time_container}>
                        <ul className={styles.tags_container}>
                            <li className={styles.tag}>Market analysis</li>
                        </ul>
                        <span className={styles.time_container}><Image src="/svgs/clock.svg" alt='clock' height={20} width={20} /> <p className={styles.item}> 5 mins Read</p></span>
                    </div>

                    <div className={styles.blog_content}>
                        {blogContent.content.map((block, index) => {
                            switch (block.type) {
                                case 'paragraph':
                                    return <p key={index}>{block.text}</p>;
                                case 'heading':
                                    return <h2 className={styles.header} key={index}>{block.text}</h2>;
                                case 'subheading':
                                    return <h3 className={styles.subheader} key={index}>{block.text}</h3>;
                                case 'smallHeading':
                                    return <h4 className={styles.smallHeader} key={index}>{block.text}</h4>;
                                case 'image':
                                    return (
                                        <div className={styles.blog_img} key={index}>
                                            <CustomImage src={block.src || ""} alt={block.alt || ""} width={800} height={400} />
                                        </div>
                                    );
                                case 'code':
                                    return (
                                        <SyntaxHighlighter language={block.language} key={index}>
                                            {`${block.text}`}
                                        </SyntaxHighlighter>
                                    );
                                case 'video':
                                    return (
                                        <div className={styles.blog_video} key={index}>
                                            <video controls autoPlay>
                                                <source src={block.src || ""} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    );
                                default:
                                    return null;
                            }

                        })}

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