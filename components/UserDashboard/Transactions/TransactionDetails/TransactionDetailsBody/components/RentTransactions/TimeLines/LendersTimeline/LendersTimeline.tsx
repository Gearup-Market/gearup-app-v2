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

interface Props {
    timelines?: any
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LendersTimeline = ({ timelines, openModal, setOpenModal }: Props) => {
    const [steps, setSteps] = useState(1)
    const isTimeElapsed = true

    const handlePrev = () => {
        if (steps > 1) {
            setSteps(steps - 1)
        }
    }

    const handleNext = () => {
        if (steps < rentLendersTimeLine.length) {
            setSteps(steps + 1)
        }
    }

    useEffect(() => {
        if (isTimeElapsed) {
            setSteps(4)
        }
    }, [isTimeElapsed])

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
                        steps == 1 && <AcceptDecline handleNext={handleNext} />
                    }
                    {
                        steps === 2 && <ConfirmHandover handleNext={handleNext} />
                    }
                    {
                        steps === 3 && <AwaitingConfirmation />
                    }
                    {
                        steps === 4 && <TransactionOngoing isTimeElapsed={isTimeElapsed} />
                    }
                    {
                        steps === 5 && <ConfirmReturn handleNext={handleNext} />
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