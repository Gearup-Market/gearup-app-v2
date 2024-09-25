'use client'
import React, { useState } from 'react'
import styles from './TransactionDetailsHeader.module.scss'
import { ChevronIcon } from '@/shared/svgs/dashboard'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    slug: string
    item: any
}

const TransactionDetailsHeader = ({ slug, item }: Props) => {
    const [activeId, setActiveId] = useState(1)
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
            <HeaderSubText title='Transactions details' variant='normal' />
            <div className={styles.item_details}>
                <div className={styles.left}>
                    <Image src="/images/admin-img.jpg" alt={item?.gear_name} width={16} height={16} />
                    <span className={styles.right}>
                        <h2>{item?.gear_name}</h2>
                        <p>{item?.amount}</p>
                    </span>
                </div>
                <div className={styles.status} data-status={item?.transaction_status.toLowerCase()}>
                    {item?.transaction_status}
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailsHeader