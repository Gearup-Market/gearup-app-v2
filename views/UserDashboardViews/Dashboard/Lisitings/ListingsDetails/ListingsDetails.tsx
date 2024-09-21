'use client';
import React from 'react'
import styles from './ListingsDetails.module.scss'
import { BackNavigation } from '@/shared'
import { BuyRentDetailsBody, BuyRentDetailsHeader } from '@/components/UserDashboard/Listings/ListingDetailsComp'
import { useSearchParams } from 'next/navigation'

const ListingsDetails = () => {
    const searchParams = useSearchParams()

    const detailsType = searchParams.get('type')
  return (
    <div className={styles.container}>
        <BackNavigation />
        <BuyRentDetailsHeader/>
        <BuyRentDetailsBody detailsType={detailsType as string}/>
    </div>
  )
}

export default ListingsDetails