'use client'
import React, { useState } from 'react'
import styles from './TransactionCardMob.module.scss'
import Image from 'next/image'
import { Button, MobileCard } from '@/shared'
import Link from 'next/link'

interface Props {
    item: any;
    lastEle?: boolean;
    ind?: number;
    transactionType?: string;
}

const TransactionCardMob = ({ item, ind, lastEle, transactionType }: Props) => {

    return (
        <MobileCard mainHeaderText={item.gear_name} subHeaderText={item.amount} mainHeaderImage="/images/admin-img.jpg" lastEle={lastEle} ind={ind} >
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Transaction date</p>
                <p className={styles.value}>{item.transaction_date}</p>
            </div>
            <div className={styles.container__details__detail_container}>
                <p className={styles.key}>Status</p>
                <p className={`${styles.value} ${styles.status}`} data-status={item.transaction_status?.toLowerCase()}>{item.transaction_status}</p>
            </div>
            <div className={styles.container__details__btn_container}>
                <Link
                    href={`/admin/third-party-check/${item?.id}?transaction_type=${transactionType}&user_role=${item?.user_role}&third_party=${item?.third_party_verification}&timeElapsed=${item?.timeElapsed}`}
                    className={styles.container__action_btn}
                >

                    <Button buttonType='secondary' className={styles.btn}>
                        see details
                    </Button>
                </Link>

            </div>
        </MobileCard>

    )
}

export default TransactionCardMob