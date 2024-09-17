"use client";
import React from 'react'
import styles from './DashboardHeader.module.scss'
import { Button } from '@/shared'
import Link from 'next/link'
import { useAppSelector } from '@/store/configureStore'

const DashboardHeader = () => {
    const user = useAppSelector(state => state.user)
    console.log(user, "user")
    return (
        <div className={styles.container}>
            <div className={styles.container__left}>
                <h2 className={styles.container__left__welcome}>Goodmorning Einstein👋🏾</h2>
                <p className={styles.container__left__question}>What are you doing today?</p>
            </div>
            <div className={styles.create_listing}>
                <Button iconPrefix='/svgs/add.svg'>
                    <Link href='/new-listing'>Create a Listing</Link>
                </Button>
            </div>
        </div>
    )
}

export default DashboardHeader