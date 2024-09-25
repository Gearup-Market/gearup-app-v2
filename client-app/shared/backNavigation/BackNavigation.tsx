'use client'
import React from 'react'
import { ChevronIcon } from '../svgs/dashboard'
import styles from './BackNavigation.module.scss'
import { useRouter } from 'next/navigation'

const BackNavigation = () => {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <button className={styles.nav_container} onClick={handleBack}>
            <span className={styles.icon}>
                <ChevronIcon color='#4E5054' />
            </span>
            <p>Back</p>
        </button>
    )
}

export default BackNavigation