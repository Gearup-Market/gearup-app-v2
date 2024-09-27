import React from 'react'
import styles from './Verification.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import GetStarted from '@/components/UserDashboard/GetStarted/GetStarted'
const Verification = () => {
	return (
		<div className={styles.container}>
			<HeaderSubText title="Verification" description='We want to keep our community safe, you’ll need to complete the verification process to rent or rent out' />
			<GetStarted title='Let’s help you get verified' />
		</div>
	)
}

export default Verification;
