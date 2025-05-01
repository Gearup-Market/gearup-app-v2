import React from 'react'
import Image from 'next/image'
import styles from './EmptyList.module.scss'

const EmptyList = () => {
    return (
        <div className={styles.container}>
            <Image className={styles.image} src="/images/Empty State.png" alt="empty-book-icon" height={200} width={200} />
            <h2 className={styles.text}>No Talent in This Category Yet</h2>
        </div>
    )
}

export default EmptyList