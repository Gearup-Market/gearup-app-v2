import React from 'react'
import styles from './GetStarted.module.scss'
import { Button, CheckBox, RadioInput } from '@/shared'
import ProgressBar from '@/shared/progressBar/ProgressBar'
import Link from 'next/link'

const GetStarted = () => {
    const verificationSteps = [
        {
            title: 'Personal identification',
            completed: true
        },
        {
            title: 'Phone number verification',
            completed: false
        },
        {
            title: 'ID verification',
            completed: true
        }
        ,
        {
            title: 'Set up account pin',
            completed: false
        },
        {
            title: 'Face match',
            completed: false
        }
    ]

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
    return (
        <div className={styles.container}>
            <div className={styles.container__subtext_container}>
                <p className={styles.container__subtext_container__subtext}>Let’s help you get verified</p>
                <p className={styles.container__subtext_container__percentage}>0% Complete</p>
            </div>
            <p className={styles.container__description}>We want to keep our community safe, you’ll need to complete the verification process to rent or rent out</p>
            <ProgressBar percent={30} height={8} radius={8} type="customized"/>
            <div >
                <ul className={styles.container__steps_container}>
                    {verificationSteps.map((step, index) => (
                        <li key={index} className={styles.container__steps_container__step}>
                            <RadioInput checked={step.completed} disabled={step.completed}/>
                            <span>{step.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Button buttonType='transparent' iconSuffix='/svgs/color-arrow.svg' className={styles.container__btn_started}>
            <Link href="/verification">
                Get Started
            </Link>
            </Button>
        </div>
    )
}

export default GetStarted