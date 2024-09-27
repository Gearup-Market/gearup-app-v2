'use client';
import React, { useState } from 'react'
import styles from './WithdrawalRequests.module.scss'
import HeaderSubText from '../../HeaderSubText/HeaderSubText'
import { CheckmarkIcon, ChevronIcon, CloseIcon } from '@/shared/svgs/dashboard'
import { withdrawalRequests } from '@/mock/withdrawal-requests'
import { Pagination } from '@/shared'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WithdrawalRequests = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [paginatedData, setPaginatedData] = useState(withdrawalRequests.slice(0, limit));
    const router = useRouter()

    const handlePagination = (page: number) => {
        const start = (page - 1) * limit;
        const end = start + limit;
        setPaginatedData(withdrawalRequests.slice(start, end));
        setPage(page)
    }



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

            <div className={styles.table_header}>
                <HeaderSubText title="Withdrawal requests" />
                <p> <span className={styles.icon}><CheckmarkIcon /> </span>Accept All</p>
            </div>

            <ul className={styles.requests_container}>
                {
                    paginatedData.map((item) => (
                        <li key={item.id} className={styles.request_item}>
                            <div className={styles.item_details}>
                                <div className={styles.left}>
                                    <Image src="/images/admin-img.jpg" alt={'avatar'} width={16} height={16} />
                                    <span className={styles.right}>
                                        <h2>{item.username}</h2>
                                        <p>{item.amount}</p>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.action_btns}>
                                <div className={styles.decline_text}> <span className={styles.icon}><CloseIcon color='#FF3729' /> </span> <p>Decline</p></div>
                                <div className={styles.accept_text}> <span className={styles.icon}><CheckmarkIcon color='#40B773' /> </span> <p>Accept</p></div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <Pagination currentPage={page} onPageChange={handlePagination} totalCount={withdrawalRequests?.length || 0} pageSize={limit} />

        </div>
    )
}

export default WithdrawalRequests