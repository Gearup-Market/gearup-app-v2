'use client'
import React from 'react'
import styles from './WishlistCard.module.scss'
import Image from 'next/image'
import { Button, CustomImage, MobileCard, Ratings, ToggleSwitch } from '@/shared'
import Link from 'next/link'
import { useGetUserDetails } from '@/app/api/hooks/users'
import { formatNumber } from '@/utils'

interface Props {
    item: any
    ind?: number
    lastEle?: boolean
    activeFilter?: string
    setShowWishList: React.Dispatch<React.SetStateAction<boolean>>
    onDeleteItem: (id: string) => void
}

const WishlistCard = ({ item, ind, lastEle, activeFilter, setShowWishList, onDeleteItem }: Props) => {
    const subHeaderText = item.listingType === ""
    const {data, isLoading, refetch} = useGetUserDetails({userId:item.user as string});
    const user = data?.data

    const forSellPrice = item?.listingType === "sell" ? item?.offer?.forSell?.pricing : ""
    const forRentPrice = item?.listingType === "rent" ? item?.offer?.forRent?.day1Offer : ""
    const bothPrice = item?.listingType === "both" ? item?.offer?.forSell?.pricing : ""
    const rentOrBuyPrice = forSellPrice || forRentPrice || bothPrice  

    if(!item) return null

    return (
        <MobileCard
            mainHeaderImage={item.listingPhotos[0]}
            mainHeaderText={item.productName}
            subHeaderText={activeFilter === 'courses' ? item.price : `NGN${formatNumber(rentOrBuyPrice)}${item.listingType === "rent" ? "/day" : ""}`}
            lastEle={lastEle}
            ind={ind}
        >
            <div>
                {
                    item.type === 'courses' ?

                        <>
                            <div className={styles.container__details__detail_container}>
                                <p className={styles.key}>Author</p>
                                <p className={styles.value}>{item.author}</p>
                            </div>
                            <div className={styles.container__details__detail_container}>
                                <p className={styles.key}>Type</p>
                                <p className={`${styles.value} ${styles.listing_type}`} >{item.listingType}</p>
                            </div>
                            <div className={styles.container__details__detail_container}>
                                <p className={styles.key}>Category</p>
                                <p className={`${styles.value} ${styles.category}`}>{item.category}</p>
                            </div>
                        </>
                        :
                        <>
                            <div className={styles.container__details__detail_container}>
                                <p className={styles.key}>{item.type === "sell" ? "Seller" : "Lender"}</p>
                                <p className={styles.value}>
                                    <div className={styles.listing_user}>

                                    <Image src={user?.avatar || "/svgs/avatar-user.svg"} alt={user?.userName||"n/a"} width={30} height={30} />
                                    <span>
                                    {user?.userName}
                                    </span>
                                    <Ratings rating={user?.rating} readOnly/>
                                    </div>
                                </p>
                            </div>
                            <div className={styles.container__details__detail_container}>
                                <p className={styles.key}>Type</p>
                                <p className={`${styles.value} ${styles.listing_type}`}>{item.listingType}</p>
                            </div>
                            <div className={styles.container__details__detail_container}>
                                <p className={styles.key}>Availability</p>
                                <p className={`${styles.value} ${styles.availability}`}>{item.status}</p>
                            </div>
                        </>
                }
                <div className={styles.container__details__detail_container}>
                    <Button style={{ width: "100%", marginRight: "1rem" }} buttonType='secondary' onClick={() => setShowWishList(false)}>
                        <Link href={`/user/listings/${item._id}`}>
                            See details
                        </Link>
                    </Button>
                    <p className={`${styles.value} ${styles.action_icons}`} onClick={() => onDeleteItem(item._id)}>
                        <Image src={'/svgs/red-trash.svg'} alt={item.title} width={16} height={16} />
                    </p>
                </div>
            </div>
        </MobileCard>
    )
}

export default WishlistCard