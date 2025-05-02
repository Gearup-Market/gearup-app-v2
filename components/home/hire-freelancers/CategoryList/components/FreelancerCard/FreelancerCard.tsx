import React from 'react'
import styles from './FreelancerCard.module.scss'
import Image from 'next/image'
import { Ratings } from '@/shared'
import Link from 'next/link'
import { AppRoutes } from '@/utils'

const FreelancerCard = () => {
    return (
        <Link href={AppRoutes.userDetails("gmmd4334")}>
            <div className={styles.container}>
                <div className={styles.image_wrapper}>
                    <Image
                        src="/images/freelancer.png"
                        fill
                        sizes="100vw"
                        alt="freelancer"
                    />
                </div>
                <div className={styles.info}>
                    <h2 className={styles.name}>Einstein419</h2>
                    <p className={styles.address}>Lagos, Nigeria</p>
                    <Ratings rating={0} showRatingNumber={true} />
                    <p className={styles.deals}>0 deals</p>
                    <p className={styles.description}>Hello, Creative Community! 🎥✨ I&apos;m thrilled to be a part of Gearup, where innovation...</p>
                </div>
            </div>
        </Link>
    )
}

export default FreelancerCard