import React from 'react'
import styles from './BlogDetailsView.module.scss'
import { BlogDetailsComponent } from '@/components/home'

interface Props {
    slug: string
}

const BlogDetailsView = ({ slug }: Props) => {
    return (
        <div className={styles.container}>
            <BlogDetailsComponent slug={slug} />
        </div>
    )
}

export default BlogDetailsView