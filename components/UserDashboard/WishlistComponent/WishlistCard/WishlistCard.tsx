'use client'
import React from 'react'
import styles from './WishlistCard.module.scss'
import Image from 'next/image'
import { Button, MobileCard, ToggleSwitch } from '@/shared'

interface Props {
    item: any
    ind?: number
    lastEle?: boolean
    activeFilter?: string
}

const WishlistCard = ({ item, ind, lastEle, activeFilter }: Props) => {

    return (
        <MobileCard
            mainHeaderImage='/images/admin-img.jpg'
            mainHeaderText={item.title}
            subHeaderText={activeFilter !== 'courses' ? item.price : ""}
            lastEle={lastEle}
            ind={ind}

        >
            <div>
            {
                item.type === 'courses' ?

                    <>
                        <div className={styles.container__details__detail_container}>
                            <p className={styles.key}>Author</p>
                            <p className={styles.value}>{item.author}</p>
                        </div>
                        <div className={styles.container__details__detail_container}>
                            <p className={styles.key}>Type</p>
                            <p className={`${styles.value}`}>{item.type}</p>
                        </div>
                        <div className={styles.container__details__detail_container}>
                            <p className={styles.key}>Category</p>
                            <p className={`${styles.value}`}>{item.category}</p>
                        </div>
                    </>
                    :
                    <>
                        <div className={styles.container__details__detail_container}>
                            <p className={styles.key}>{item.type === "sell"?"Seller":"Lender"}</p>
                            <p className={styles.value}>{item.category}</p>
                        </div>
                        <div className={styles.container__details__detail_container}>
                            <p className={styles.key}>Type</p>
                            <p className={styles.value}>{item.type}</p>
                        </div>
                        <div className={styles.container__details__detail_container}>
                            <p className={styles.key}>Availability</p>
                            <p className={`${styles.value} ${styles.rental}`}>{item.availability}</p>
                        </div>
                    </>
            }
                        <div className={styles.container__details__detail_container}>
                            <Button buttonType='secondary'>See details</Button>
                            <p className={`${styles.value} ${styles.action_icons}`}>
                                <Image src={'/svgs/red-trash.svg'} alt={item.title} width={16} height={16} />
                            </p>
                        </div>
            </div>
        </MobileCard>
    )
}

export default WishlistCard