'use client'
import React, { useState } from 'react'
import styles from './UserCardMob.module.scss'
import Image from 'next/image'
import { Button, MobileCard } from '@/shared'
import Link from 'next/link'

interface Props {
    item: any
    url: string;
    lastEle?: boolean;
    ind?: number;
}
const UserCardMob = ({ item, url, lastEle, ind }: Props) => {

    return (
        <MobileCard mainHeaderText={item.username} subHeaderText={item.email} mainHeaderImage="/images/admin-img.jpg" lastEle={lastEle} ind={ind} >

            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Joined date</p>
                <p className={styles.value}>{item.joined_date}</p>
            </div>
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Account Status</p>
                <p className={`${styles.value} ${styles.status}`} data-status={item.account_status?.toLowerCase()}>{item.account_status}</p>
            </div>
            <div className={styles.container__details__btn_container}>
                <Link href={`/admin/${url}/${item.id}`} className={styles.container__action_btn}>
                    <Button buttonType='secondary' className={styles.btn}>
                        see details
                    </Button>
                </Link>

            </div>
        </MobileCard>
    )
}

export default UserCardMob