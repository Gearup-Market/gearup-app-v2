'use client';
import React from 'react'
import styles from './ListingsDetails.module.scss'
import { BackNavigation, Button } from '@/shared'
import { HeaderSubText } from '@/components/UserDashboard'
import PersonalDetails from '../../Transactions/TransactionDetails/TransactionDetailsBody/components/PersonalDetails/PersonalDetails'
import BuyRentListing from './components/BuyRentListing/BuyRentListing'
import CourseListing from './components/CourseListing/CourseListing';

const filters = [
    {
        id: 1,
        name: 'Buy'
    },
    {
        id: 2,
        name: 'Rent'
    }
]

const ListingsDetails = () => {
    const [activeFilterId, setActiveFilterId] = React.useState(1)
    const listingType: string = 'buy-rent'

    return (
        <div className={styles.container}>
            <BackNavigation />
            <div className={styles.header_container}>
                <HeaderSubText title='Review listing' variant='main' />
                <div className={styles.btn_container}>
                    <Button className={styles.decline_btn}>Decline</Button>
                    <Button className={styles.accept_btn}>Approve</Button>
                </div>
            </div>
            {
                listingType === 'buy-rent' &&
                <ul className={styles.container__filters_container}>
                    {
                        filters.map((filter) => (
                            <li data-active={filter.id === activeFilterId} onClick={() => {
                                setActiveFilterId(filter.id)
                            }} key={filter.id} className={styles.container__filters_container__filter}>
                                <p>{filter.name}</p>
                            </li>
                        ))
                    }
                </ul>
            }
            <main className={styles.main_container}>
                <div className={styles.left_container}>

                    {
                        listingType === 'courses' ? (
                            <CourseListing />
                        ) :
                            <>
                                <BuyRentListing />
                            </>
                    }
                </div>
                <div className={styles.right_container}>
                    <PersonalDetails profileLink='/settings?q=profile' title='Merchant' name='Wade Warren' subText='Lagos, Nigeria' />
                </div>
            </main>
            <div className={styles.btn_container_mob}>
                <Button className={styles.decline_btn}>Decline</Button>
                <Button className={styles.accept_btn}>Approve</Button>
            </div>
        </div>
    )
}

export default ListingsDetails