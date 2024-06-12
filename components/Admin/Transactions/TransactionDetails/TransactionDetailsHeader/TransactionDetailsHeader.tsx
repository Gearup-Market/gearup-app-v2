'use client'
import React, { useState } from 'react'
import styles from './TransactionDetailsHeader.module.scss'
import { ChevronIcon } from '@/shared/svgs/dashboard'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
    slug: string
    item: any
}

const list = [
    { id: 1, name: 'Overview' },
    { id: 2, name: 'Messages' },
    { id: 3, name: 'Details' },
]

const TransactionDetailsHeader = ({ slug, item }: Props) => {
    const [activeId, setActiveId] = useState(1)
    const router = useRouter()

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
            <HeaderSubText title='Transactions details' variant='main' />
            <div className={styles.item_details}>
                <div className={styles.left}>
                    <Image src="/images/admin-img.jpg" alt={item?.name} width={16} height={16} />
                    <span className={styles.right}>
                        <h2>{item?.name}</h2>
                        <p>{item?.amount}</p>
                    </span>
                </div>
                <div className={styles.status} data-status={item?.status.toLowerCase()}>
                    {item?.status}
                </div>
            </div>
            <ul className={styles.container__children_container}>
                {
                    list.map((item) => (
                        <li onClick={() => setActiveId(item.id)} key={item.id} className={styles.container__children_container__filter} data-active={activeId === item.id}>
                            <p>{item.name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TransactionDetailsHeader