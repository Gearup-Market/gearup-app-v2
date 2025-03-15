import React from 'react'
import styles from './HeroSection.module.scss'
import { SearchField } from '@/shared'

const HeroSection = () => {
    return (
        <section className={styles.container}>
            <div className={styles.text}>
                <h1>
                    Discover & Hire Top industry expert
                </h1>
                <p>
                    Find and collaborate with top industry experts to bring your creative projects to life with the right talent
                </p>
            </div>
            <SearchField />
        </section>
    )
}

export default HeroSection