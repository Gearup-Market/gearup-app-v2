'use client'
import React, { useState } from 'react'
import styles from './WalletTransactionCardMob.module.scss'
import Image from 'next/image'
import { Button, MobileCard } from '@/shared'

interface Props {
    item: any;
    lastEle?: boolean;
    ind?: number;
}

const WalletTransactionCardMob = ({ item, lastEle, ind }: Props) => {

    return (
        <MobileCard mainHeaderText={item.name} subHeaderText={item.amount} mainHeaderImage="/images/admin-img.jpg" lastEle={lastEle} ind={ind} >
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Transaction date</p>
                <p className={styles.value}>{item.transaction_date}</p>
            </div>
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Account Status</p>
                <p className={`${styles.value} ${styles.status}`} data-status={item.status?.toLowerCase()}>{item.status}</p>
            </div>
            <div className={styles.container__details__btn_container}>
                <Button buttonType='secondary' className={styles.btn}>
                    Download receipt
                </Button>

            </div>
        </MobileCard>
    )
}

export default WalletTransactionCardMob