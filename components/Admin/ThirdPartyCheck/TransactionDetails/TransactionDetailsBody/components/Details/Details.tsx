'use client'
import React, { useState } from 'react'
import styles from './Details.module.scss'
import { CopyIcon } from '@/shared/svgs/dashboard'
import DetailsTimeline from '../TimeLines/TimeLines'
import StatusUpdate from '../StatusUpdate/StatusUpdate'
import PersonalDetails from '../PersonalDetails/PersonalDetails'

interface Props {
    item?: any
}

const DetailsComponent = ({ item }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.container__left}>
                <div className={styles.container__left__summary_container}>
                    <h3 className={styles.title}>Transaction Details</h3>
                    <div className={styles.summary_item}>
                        <h4>Transaction type</h4>
                        <p>Ebook course</p>
                    </div>
                    <div className={styles.summary_item}>
                        <h4>Transaction ID</h4>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <p>0000045847378283543</p>
                            <span className={styles.icon}>
                                <CopyIcon />
                            </span>
                        </span>
                    </div>
                    <div className={styles.summary_item}>
                        <h4>Transaction date</h4>
                        <p>15 Dec, 2023</p>
                    </div>
                    <div>
                        <div className={styles.summary_item}>
                            <h4>Gearup fee</h4>
                            <p>$300</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>VAT</h4>
                            <p>$300</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4 >Total amount</h4>
                            <p className={styles.total}>$300</p>
                        </div>
                    </div>
                </div>
                <div>
                    <DetailsTimeline />
                </div>
            </div>
            <div className={styles.container__right}>
                <PersonalDetails title="Customer" name='Wade Warren' subText='Lagos, Nigeria' profileLink='/admin/settings/profile' />
                <PersonalDetails title="Merchant" name='Wade Warren' subText='Enugu, Nigeria' profileLink='/admin/settings/profile' />
                <StatusUpdate />
            </div>
        </div>
    )
}

export default DetailsComponent