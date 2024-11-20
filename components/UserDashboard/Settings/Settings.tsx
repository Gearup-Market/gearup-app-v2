'use client'
import React, { useEffect, useState } from 'react'
import { Account, HelpCenter, ExportWallet, Payments, Profile, Sidebar, Verification } from './components'
import styles from './Settings.module.scss'

import { useSearchParams } from 'next/navigation'
import HeaderSubText from '../HeaderSubText/HeaderSubText'


const Settings = () => {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q')
  const [active, setActive] = useState<string>('/user/settings?q=payments')

  const settingsLists = [
    {
      id: 3,
      name: 'Payments',
      path: '/user/settings?q=payments',
      slug: 'payments',
      icon: '/svgs/settings-payment.svg',
    },
    {
      id: 1,
      name: 'Profile',
      path: '/user/settings?q=profile',
      slug: 'profile',
      icon: '/svgs/settings-profile.svg',
    },
    {
      id: 2,
      name: 'Verification',
      path: '/user/settings?q=verification',
      slug: 'verification',
      icon: '/svgs/settings-verification.svg',
    },

    {
      id: 4,
      name: 'Account',
      path: '/user/settings?q=account',
      slug: 'account',
      icon: '/svgs/settings-account.svg',
    },
    {
      id: 6,
      name: 'Export wallet',
      path: '/user/settings?q=export-wallet',
      slug: 'export-wallet',
      icon: '/svgs/settings-wallet-icon.svg',
    },
    {
      id: 5,
      name: 'Help center',
      path: '/user/settings?q=help-center',
      slug: 'help-center',
      icon: '/svgs/settings-help-center.svg',
    },

  ]

  useEffect(() => {
    if(!searchQuery){
      window.location.href = '/user/settings?q=payments'
    }
    setActive(searchQuery || 'payments')
  }, [searchQuery])

  return (
    <div className={styles.wrapper}>
      <HeaderSubText title='Settings' variant='main' />
      <div className={styles.container}>
        <Sidebar settingsLists={settingsLists} active={active} />
        <div className={styles.content}>
          {searchQuery === 'profile' && <Profile />}
          {searchQuery === 'verification' && <Verification />}
          {searchQuery === 'account' && <Account />}
          {searchQuery === 'payments' && <Payments />}
          {searchQuery === 'help-center' && <HelpCenter />}
          {searchQuery === 'export-wallet' && <ExportWallet />}
        </div>
      </div>
    </div>
  )
}

export default Settings