import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import React from 'react'
import styles from './DashboardUserHeader.module.scss'
import { Button, Ratings } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'
const DashboardUserHeader = () => {
    const socials = [
        {
            icon: '/svgs/twitter.svg',
            link: 'https://twitter.com'
        },
        {
            icon: '/svgs/insta.svg',
            link: 'https://instagram.com'
        },
        {
            icon: '/svgs/linkedin.svg',
            link: 'https://linkedin.com'
        },
        {
            icon: '/svgs/facebook.svg',
            link: 'https://facebook.com'
        },
    ]
    return (
        <div className={styles.wrapper}>
            <HeaderSubText title="User Information" />
            <div className={styles.container}>
                <div className={styles.container__left}>
                    <div className={styles.left_top}>
                        <div className={styles.image_container}>
                            <Image src='https://images.unsplash.com/photo-1610088441520-4352457e7095?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFuJTIwYWxvbmV8ZW58MHx8MHx8fDA%3D' width={100} height={100} alt='user avatar' className={styles.user_image} />
                            <span className={styles.active_status}></span>
                        </div>
                        <div >
                            <div className={styles.name_container}>
                                <h3 className={styles.user_name}>Annette230</h3>
                                <span className={styles.verification_status}>Verified</span>
                            </div>
                            <p className={styles.faded_text}>annette@gmail.com</p>
                            <p className={styles.faded_text}>Lagos, Nigeria</p>
                            <div className={styles.flex_item} >
                                <p className={styles.faded_text}>20 Deals </p>
                                <p className={styles.divider}>|</p>
                                <span className={styles.rating_item}>
                                    <Ratings rating={4} />
                                    <p>   {4.0}</p>
                                </span>
                            </div>
                            <div className={styles.flex_item}>
                                <p className={styles.faded_text}>Date joined :</p>
                                <p className={styles.date_text}> 20th May 2021</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.socials_container}>
                        {
                            socials.map((social, index) => (
                                <Link href={social.link} key={index}>
                                    <Image src={social.icon} width={50} height={50} alt='social icon' />
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.btns_container}>
                    <Button buttonType='secondary' className={styles.view_profile}>
                        View profile
                    </Button>
                    <Button buttonType='secondary' className={styles.deactivate_btn}>
                        Deactivate user
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DashboardUserHeader