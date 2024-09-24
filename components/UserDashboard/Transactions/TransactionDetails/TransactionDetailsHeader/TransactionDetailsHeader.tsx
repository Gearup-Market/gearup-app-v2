'use client'
import React, { useState } from 'react'
import styles from './TransactionDetailsHeader.module.scss'
import { ChevronIcon } from '@/shared/svgs/dashboard'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    slug: string
    item: any
    activeView?: string
    setActiveView?: any
}

const list = [
    { id: 1, name: 'Overview' },
    { id: 2, name: 'Messages' },
    { id: 3, name: 'Details' },
]



const TransactionDetailsHeader = ({ slug, item,activeView,setActiveView }: Props) => {
    const router = useRouter()
    const search = useSearchParams()
    const transaction_type = search.get('transaction_type')

    const handleBack = () => {
        router.back()
    }

    return (
        <div className={styles.container}>
            <div className={styles.nav_container} onClick={handleBack}>
                <span className={styles.icon}>
                    <ChevronIcon color='#4E5054' />
                </span>
                <p>Back</p>
            </div>
            <div className={styles.item_details}>
                <div className={styles.left}>
                    <Image src="/images/admin-img.jpg" alt={item?.gear_name} width={16} height={16} />
                    <span className={styles.right}>
                        <h2>{item?.gear_name}</h2>
                        <p>{item?.amount}</p>
                    </span>
                </div>
                <div className={styles.status} data-status={item?.transaction_status}>
                    {item?.transaction_status}
                </div>
            </div>
            {
                transaction_type !== 'courses' &&
                <ul className={styles.container__children_container}>
                    {
                        list.map((item) => (
                            <li onClick={() => setActiveView(item.name.toLowerCase())} key={item.id} className={styles.container__children_container__filter} data-active={activeView?.toLowerCase() === item.name.toLowerCase()}>
                                <p>{item.name}</p>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}

export default TransactionDetailsHeader