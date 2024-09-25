'use client'
import React, { useState } from 'react'
import styles from './Blog.module.scss'
import BlogsArticles from './components/BlogsArticles/BlogsArticles'
import BlogsCategories from './components/BlogsCategories/BlogsCategories'

enum Filter {
    Articles = 1,
    Categories = 2
}

const filters = [
    {
        id: 1,
        name: 'Articles'
    },
    {
        id: 2,
        name: 'Categories'
    },
]
const Blog = () => {
    const [activeFilterId, setActiveFilterId] = useState(1)
    return (
        <div className={styles.container}>
            <div className={styles.container__download_filter}>
                <ul className={styles.parent_container}>
                    {
                        filters.map((filter) => (
                            <li data-active={filter.id === activeFilterId} onClick={() => {
                                setActiveFilterId(filter.id)
                            }} key={filter.id} className={styles.filter}>
                                <p>{filter.name}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>

            {
                activeFilterId === Filter.Articles ? <BlogsArticles /> : <BlogsCategories />
            }

        </div>
    )
}

export default Blog