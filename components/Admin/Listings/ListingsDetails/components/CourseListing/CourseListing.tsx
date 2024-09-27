import Image from 'next/image'
import React from 'react'
import styles from './CourseListing.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { CopyIcon } from '@/shared/svgs/dashboard'
import { CustomImage } from '@/shared'
const CourseListing = () => {
    return (
        <div className={styles.container}>
            <div className={styles.slide}>
                <CustomImage src='https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9uJTIwY291cnNlfGVufDB8fDB8fHww' alt="" fill sizes="100vw" />
            </div>
            <HeaderSubText title='The Complete Cinematography course : From Zero To Expert' variant='normal' />
            <div className={styles.container__summary_container}>
                <h3 className={styles.title}>Overview</h3>
                <div className={styles.summary_item}>
                    <h4>Course type</h4>
                    <p>Live</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Duration</h4>
                    <p>2 months</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Starts</h4>
                    <p>16/12/2023</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Ends</h4>
                    <p>16/12/2023</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Daily hours</h4>
                    <p>2 hours</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Meeting link</h4>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <p>Googlemeet.com/fhsgsjssqw33r22</p>
                        <span className={styles.icon}>
                            <CopyIcon />
                        </span>
                    </span>
                </div>
                <div className={styles.summary_item}>
                    <h4>Price</h4>
                    <p>$400</p>
                </div>
            </div>
            <div className={styles.container__summary_container}>
                <h3 className={styles.title}>You’ll learn</h3>
                <div className={styles.summary_item}>
                    <h4>Are you ready to unlock the secrets of digital marketing and take your skills to the next level? This comprehensive course is designed for beginners and aspiring marketers who want to master the art of digital marketing. From understanding the fundamentals to implementing advanced strategies, this course covers it all. Join us on a journey that demystifies the world of online marketing and empowers you to become a digital marketing pro.
                    </h4>
                </div>
                <span className={styles.show_more}>show more</span>
            </div>
            <div className={styles.container__summary_container}>
                <h3 className={styles.title}>Content</h3>
                <div className={styles.summary_item}>
                    <h4>Are you ready to unlock the secrets of digital marketing and take your skills to the next level? This comprehensive course is designed for beginners and aspiring marketers who want to master the art of digital marketing. From understanding the fundamentals to implementing advanced strategies, this course covers it all. Join us on a journey that demystifies the world of online marketing and empowers you to become a digital marketing pro.
                    </h4>
                </div>
                <span className={styles.show_more}>show more</span>
            </div>
            <div className={styles.container__summary_container}>
                <h3 className={styles.title}>Description</h3>
                <div className={styles.summary_item}>
                    <h4>Are you ready to unlock the secrets of digital marketing and take your skills to the next level? This comprehensive course is designed for beginners and aspiring marketers who want to master the art of digital marketing. From understanding the fundamentals to implementing advanced strategies, this course covers it all. Join us on a journey that demystifies the world of online marketing and empowers you to become a digital marketing pro.
                    </h4>
                </div>
                <span className={styles.show_more}>show more</span>
            </div>
        </div>
    )
}

export default CourseListing