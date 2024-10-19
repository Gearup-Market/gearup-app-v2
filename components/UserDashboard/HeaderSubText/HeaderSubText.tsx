'use client'
import React from 'react'
import styles from './HeaderSubText.module.scss'

interface HeaderSubTextProps {
    title?: string
    description?: string
    variant?: 'main' | 'normal' | 'medium';
}
const HeaderSubText = ({ title, description, variant = 'normal' }: HeaderSubTextProps) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title} data-variant={variant}>{title}</h2>
            {!!description && <p className={styles.description}>{description}</p>}
        </div>
    )
}

export default HeaderSubText;