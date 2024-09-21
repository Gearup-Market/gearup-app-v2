"use client";

import React from 'react'
import styles from './DashboardHeader.module.scss'
import { Button } from '@/shared'
import { useAppSelector } from '@/store/configureStore'
import { useRouter } from 'next/navigation'

function greeting(){
    const timeNow = new Date().getHours()

    if ( timeNow >= 5 && timeNow < 12){
        return "Good morning";
    } else if(timeNow >= 12 && timeNow < 18){
        return "Good afternoon";
    } else {
        return "Good evening"
    }
}

const DashboardHeader = () => {
    const user = useAppSelector(s => s.user);
    const router = useRouter()
    return (
        <div className={styles.container}>
            <div className={styles.container__left}>
                <h2 className={styles.container__left__welcome}>{greeting()}, {user.userName} 👋🏾</h2>
                <p className={styles.container__left__question}>What are you doing today?</p>
            </div>
            <div className={styles.create_listing}>
                <Button iconPrefix='/svgs/add.svg' onClick={() => router.push('/new-listing')}>
                    Create a Listing
                </Button>
            </div>
        </div>
    )
}

export default DashboardHeader