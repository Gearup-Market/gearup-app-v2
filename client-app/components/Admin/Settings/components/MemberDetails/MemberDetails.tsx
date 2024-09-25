import React from 'react'
import styles from './MemberDetails.module.scss'
import { BackNavigation } from '@/shared'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import RecentActivitiesTable from './RecentActivities/RecentActivities'
import MemberHeader from './MemberHeader/MemberHeader'

const MemberDetails = () => {
    return (
        <div className={styles.container}>
            <BackNavigation />
            <HeaderSubText title="Member" variant='main' />
            <MemberHeader />
            <RecentActivitiesTable />
        </div>
    )
}

export default MemberDetails