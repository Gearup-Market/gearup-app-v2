'use client'
import React, { useState, useEffect } from 'react'
import styles from './LendersTimeline.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { CheckmarkIcon, LineIcon } from '@/shared/svgs/dashboard'
import { AcceptDecline, AwaitingConfirmation, ConfirmHandover, ConfirmReturn, TransactionOngoing } from './components'
import { rentLendersTimeLine } from '../../../utils/data'
import TimeLine from './components/TimeLine/TimeLine'
import Modal from '@/shared/modals/modal/Modal'
import { CustomRatingFeedback } from '../../..'
import { iTransactionDetails } from '@/interfaces'
import useTimeline from '@/hooks/useTimeline'
import { useAppSelector } from '@/store/configureStore'

interface Props {
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LendersTimeline = ({ openModal, setOpenModal }: Props) => {
    const { transaction } = useAppSelector(s => s.transaction);
    if(!transaction) return null;

    const {steps, handleAction} = useTimeline(transaction)

    return (
        <div>

            <div className={styles.container}>
                <div className={styles.desktop_timelines}>
                    <div className={styles.left}>
                        <HeaderSubText title="Transaction timeline" />
                        <TimeLine steps={steps} />
                    </div>
                </div>
                <div className={styles.right}>
                    {
                        steps == 1 && <AcceptDecline item={transaction} handleNext={handleAction} />
                    }
                    {
                        steps === 2 && <ConfirmHandover item={transaction} handleNext={handleAction} />
                    }
                    {
                        steps === 3 && <AwaitingConfirmation  />
                    }
                    {
                        steps === 4 && <TransactionOngoing isTimeElapsed={false} />
                    }
                    {
                        steps === 5 && <ConfirmReturn handleNext={handleAction} />
                    }
                    {
                        steps === 6 && <CustomRatingFeedback />
                    }

                </div>
                <Modal openModal={openModal} setOpenModal={() => setOpenModal(false)} title='Transaction timeline'>
                    <TimeLine steps={steps} />
                </Modal>
            </div>
        </div>
    )
}

export default LendersTimeline