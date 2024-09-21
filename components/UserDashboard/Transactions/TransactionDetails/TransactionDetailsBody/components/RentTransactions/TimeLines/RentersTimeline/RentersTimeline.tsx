'use client'
import React, { useState, useEffect } from 'react'
import styles from './RentersTimeline.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { AwaitingApproval, AwaitingConfirmation, ConfirmHandover, InitiateReturn, TransactionOngoing } from './components'
import { rentRentersTimeline } from '../../../utils/data'
import Modal from '@/shared/modals/modal/Modal'
import TimeLine from './components/TimeLine/TimeLine'
import { CustomRatingFeedback } from '../../..'

interface Props {
    timelines?: any
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RentersTimeline = ({ timelines, openModal, setOpenModal }: Props) => {


    const [steps, setSteps] = useState(1)
    const isTimeElapsed = true


    const handlePrev = () => {
        if (steps > 1) {
            setSteps(steps - 1)
        }
    }

    const handleNext = () => {
        if (steps < rentRentersTimeline.length) {
            setSteps(steps + 1)
        }
    }

    useEffect(() => {
        if (isTimeElapsed) {
            setSteps(3)
        }
    }, [isTimeElapsed])

    return (
        <div className={styles.container}>
            <div className={styles.desktop_timelines}>
                <div className={styles.left}>
                    <HeaderSubText title="Transaction timeline" />
                    <TimeLine steps={steps} />
                </div>
            </div>
            <div className={styles.right}>
                {
                    steps == 1 && <AwaitingApproval handleNext={handleNext} />
                }
                {
                    steps === 2 && <ConfirmHandover handleNext={handleNext} />
                }
                {
                    steps === 3 && <TransactionOngoing handleNext={handleNext} isTimeElapsed={isTimeElapsed} />
                }
                {
                    steps === 4 && <InitiateReturn handleNext={handleNext} />
                }
                {
                    steps === 5 && <AwaitingConfirmation />
                }
                {
                    steps === 6 && <CustomRatingFeedback />
                }
            </div>
            <Modal openModal={openModal} setOpenModal={() => setOpenModal(false)} title='Transaction timeline'>
                <TimeLine steps={steps} />
            </Modal>
        </div>
    )
}

export default RentersTimeline