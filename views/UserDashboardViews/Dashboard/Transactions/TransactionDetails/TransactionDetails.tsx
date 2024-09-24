'use client'
import React, { useEffect } from 'react'
import styles from './TransactionDetails.module.scss'
import { TransactionDetailsBody, TransactionDetailsHeader } from '@/components/UserDashboard/Transactions/TransactionDetails'
import { transactions } from '@/mock/transactions.mock'
import ChatBodySection from '@/components/UserDashboard/Messages/components/ChatBodySection/ChatBodySection'
import GearDetailsSection from '@/components/UserDashboard/Transactions/TransactionDetails/TransactionDetailsBody/GearDetailsSection/GearDetailsSection'

interface Props {
    slug: string
}


enum DetailsView {
    OVERVIEW = 'overview',
    MESSAGES = 'messages',
    DETAILS = 'details'
}

const TransactionDetails = ({ slug }: Props) => {
    const [item, setItem] = React.useState<any>()
    const [activeView, setActiveView] = React.useState(DetailsView.OVERVIEW)

    useEffect(() => {
        setItem(transactions.find((item) => item.id.toString() === slug))
    }, [slug])

    return (
        <div className={styles.container}>
            <TransactionDetailsHeader slug={slug} item={item} activeView={activeView} setActiveView={setActiveView} />
            {
                activeView === DetailsView.OVERVIEW && <TransactionDetailsBody item={item} />
            }
            {
                activeView === DetailsView.MESSAGES && <div className={styles.chat_body_section}> <ChatBodySection showAllBorder={true} /></div>
            }
            {
                activeView === DetailsView.DETAILS && <GearDetailsSection/>
            }
            
        </div>
    )
}

export default TransactionDetails