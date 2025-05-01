import React from 'react'
import styles from './HeroSection.module.scss'
import { SearchField } from '@/shared'
import DoubleSearchField from '../DoubleSearchField/DoubleSearchField'

interface Props {
    category: string | null
    description: string | null
}

const HeroSection = ({ category, description }: Props) => {
    return (
        <section className={styles.container}>
            <div className={styles.text}>
                <h1>
                    {
                        !category ? "Discover & Hire Top industry expert" : `Hire a ${category}`
                    }

                </h1>
                <p>
                    {
                        !description ? "Find and collaborate with top industry experts to bring your creative projects to life with the right talent" : `${description}`
                    }
                </p>
            </div>
            {
                !category ?
                <SearchField />
                :
                <DoubleSearchField/>
            }
        </section>
    )
}

export default HeroSection