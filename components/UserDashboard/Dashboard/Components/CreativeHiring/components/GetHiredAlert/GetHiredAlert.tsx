import React, { useState } from 'react'
import styles from './GetHiredAlert.module.scss'
import { CloseIcon } from '@/shared/svgs/dashboard'
import { Button } from '@/shared'
import GetHiredSteps from './components/GetHiredSteps/GetHiredSteps'

interface Props {
    onCloseAlert: () => void
}


const GetHiredAlert = ({ onCloseAlert }: Props) => {
    const [showHiringSteps, setShowHiringSteps] = useState(false)

    const onClose = () => {
        setShowHiringSteps(false)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.alert}>
                    <h2 className={styles.title}>Get Hired for Your Creative Expertise</h2>
                    <p className={styles.description}>
                        Showcase your skills and connect with clients looking for top creative talent.
                    </p>
                    <Button onClick={() => setShowHiringSteps(true)} iconSuffix="/svgs/arrow-color.svg" className={styles.button}>Get Started </Button>
                </div>
                <span onClick={onCloseAlert} className={styles.close_icon}>
                    <CloseIcon />
                </span>
            </div>
            <GetHiredSteps isOpen={showHiringSteps} onClose={onClose} />
        </>
    )
}

export default GetHiredAlert