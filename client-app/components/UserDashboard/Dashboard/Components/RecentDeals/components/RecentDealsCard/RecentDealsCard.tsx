'use client'
import React from 'react'
import styles from './RecentDealsCard.module.scss'
import { Button, MobileCard } from '@/shared'

interface Props {
    item: any
    ind?: number
    lastEle?: boolean
}
const RecentDealsCard = ({ item, ind, lastEle }: Props) => {

    return (
        <MobileCard mainHeaderText={item.title} subHeaderText={item.price} mainHeaderImage="/images/admin-img.jpg" lastEle={lastEle} ind={ind} >
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Transaction date</p>
                <p className={styles.value}>{item.transaction_date}</p>
            </div>
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Type</p>
                <p className={`${styles.value} ${styles.rental}`}>{item.type}</p>
            </div>
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Status</p>
                <p className={`${styles.value} ${styles.status}`} data-status={item.status.toLowerCase()}>{item.status}</p>
            </div>
            <div className={styles.container__details__btn_container}>
                <Button buttonType='secondary' className={styles.btn}>
                    see details
                </Button>

            </div>
        </MobileCard>
    )
}

export default RecentDealsCard