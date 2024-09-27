import React from 'react'
import styles from './Dashboard.module.scss'
import { CardsSection, DashboardHeader, RecentDeals, TotalEarnings } from './Components'
import GetStarted from '../GetStarted/GetStarted'

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <GetStarted description='We want to keep our community safe, you’ll need to complete the verification process to rent or rent out' title='Let’s help you get verified'/>
      <CardsSection />
      <TotalEarnings/>
      <RecentDeals/>
    </div>
  )
}

export default Dashboard