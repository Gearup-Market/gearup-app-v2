"use client";

import React from 'react'
import styles from './DashboardHeader.module.scss'
import { Button } from '@/shared'
import { useAppSelector } from '@/store/configureStore'
import Link from 'next/link'
import toast from 'react-hot-toast';

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
    const user = useAppSelector(state => state.user)
    console.log(user, "user")

    const handleClick =()=>{
        if(user.isVerified) return;
        toast.error("Complete your verification before creating a listing")
    }
    return (
        <div className={styles.container}>
            <div className={styles.container__left}>
                <h2 className={styles.container__left__welcome}>{greeting()} {user?.userName || "Guest"} 👋🏾</h2>
                <p className={styles.container__left__question}>What are you doing today?</p>
            </div>
            <div className={styles.create_listing}>
                <Button iconPrefix='/svgs/add.svg' onClick={handleClick}>
                    <Link href={user.isVerified?'/new-listing':""}>Create a Listing</Link>
                </Button>
            </div>
        </div>
    )
}

export default DashboardHeader