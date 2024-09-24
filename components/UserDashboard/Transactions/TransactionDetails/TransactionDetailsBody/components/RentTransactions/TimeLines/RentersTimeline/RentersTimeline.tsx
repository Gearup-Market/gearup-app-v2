'use client'
import React, { useState, useEffect } from 'react'
import styles from './RentersTimeline.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { AwaitingApproval, AwaitingConfirmation, ConfirmHandover, InitiateReturn, TransactionOngoing } from './components'
import { rentRentersTimeline } from '../../../utils/data'
import Modal from '@/shared/modals/modal/Modal'
import TimeLine from './components/TimeLine/TimeLine'
import { CustomRatingFeedback } from '../../..'
import { iTransactionDetails } from '@/interfaces'
import useTimeline from '@/hooks/useTimeline'

interface Props {
    item: iTransactionDetails
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RentersTimeline = ({ item, openModal, setOpenModal }: Props) => {
    const {steps, handleAction} = useTimeline(item)

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
                    steps == 1 && <AwaitingApproval item={item} handleNext={handleAction} />
                }
                {
                    steps === 2 && <ConfirmHandover item={item} handleNext={handleAction} />
                }
                {
                    steps === 3 && <TransactionOngoing item={item} handleNext={handleAction} isTimeElapsed={false} />
                }
                {
                    steps === 4 && <InitiateReturn handleNext={handleAction} />
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