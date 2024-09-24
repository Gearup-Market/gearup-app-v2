import React, { useState } from 'react'
import styles from './BuySaleTransactions.module.scss'
import DetailsSummary from '../DetailsSummary/DetailsSummary'
import { BuyersTimeline, SellersTimeline } from './TimeLines'
import { useSearchParams } from 'next/navigation'
import HeaderSubText from '@/components/UserDashboard/HeaderSubText/HeaderSubText'
import { MoreIcon } from '@/shared/svgs/dashboard'

interface Props {
    item?: any
}

const BuySaleTransactions = ({ item }: Props) => {
    const [openModal, setOpenModal] = useState(false)
    const search = useSearchParams()
    const timeline = search.get('user_role')
    console.log(timeline)
    return (
        <div className={styles.container}>
            <div className={styles.title_more_icon}>
                <HeaderSubText title='Transaction Timeline' />
                <span className={styles.icon_container}>
                    < MoreIcon onClick={(e) => {
                        setOpenModal(true)
                    }
                    } />
                </span>
            </div>
            {
                timeline === 'buyer' ? <BuyersTimeline openModal={openModal} setOpenModal={setOpenModal} /> : <SellersTimeline openModal={openModal} setOpenModal={setOpenModal} />
            }
            <DetailsSummary item={item} />
        </div>
    )
}

export default BuySaleTransactions