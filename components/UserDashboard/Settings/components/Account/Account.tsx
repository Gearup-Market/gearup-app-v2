import React from 'react'
import styles from './Account.module.scss'
import { AccountPinSet, PasswordResetForm } from './Components'
const Account = () => {
  return (
    <div className={styles.container}>
      <PasswordResetForm />
      <AccountPinSet />
    </div>
  )
}

export default Account