'use client'
import React, { useState } from 'react'
import styles from './ListingCarMob.module.scss'
import Image from 'next/image'
import { Button, MobileCard } from '@/shared'

interface Props {
    item: any
    lastEle?: boolean;
    ind?: number;
}
const ListingCardMob = ({ item, lastEle, ind }: Props) => {

    return (
        <MobileCard mainHeaderText={item.title} subHeaderText={item.price} mainHeaderImage="/images/admin-img.jpg" lastEle={lastEle} ind={ind} >
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Category</p>
                <p className={styles.value}>{item.category}</p>
            </div>
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Date</p>
                <p className={`${styles.value}`}>{item.date}</p>
            </div>
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Status</p>
                <p className={`${styles.value} ${styles.status}`} data-status={item.account_status?.toLowerCase()}>{item.status}</p>
            </div>
            <div className={styles.container__details__btn_container}>
                <Button buttonType='secondary' className={styles.btn}>
                    see details
                </Button>

            </div>
        </MobileCard>

    )
}

export default ListingCardMob