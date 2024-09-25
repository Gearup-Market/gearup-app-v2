'use client'
import React, { useState, useEffect } from 'react'
import styles from './BuyersTimeline.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { CheckmarkIcon } from '@/shared/svgs/dashboard'
import { AwaitingApproval, ConfirmShipment, StatusReport } from './components'
import { saleBuyersTimeline, saleBuyersTimelineThirdParty } from '../../../utils/data'
import { useSearchParams } from 'next/navigation'
import TimeLine from './components/TimeLine/TimeLine'
import Modal from '@/shared/modals/modal/Modal'
import { CustomRatingFeedback } from '../../..'
interface Timeline {
    id: number
    name: string
}
interface Props {
    timelines?: any
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const BuyersTimeline = ({ timelines, openModal, setOpenModal }: Props) => {
    const [steps, setSteps] = useState(1)
    const [newTimelines, setNewTimelines] = useState<Timeline[]>([])
    const search = useSearchParams()
    const thirdPartyVerification = search.get('third_party')

    const handlePrev = () => {
        if (steps > 1) {
            setSteps(steps - 1)
        }
    }

    const handleNext = () => {
        if (steps < newTimelines.length) {
            setSteps(steps + 1)
        }
    }

    useEffect(() => {
        if (thirdPartyVerification) {
            setNewTimelines(saleBuyersTimelineThirdParty)
        } else {
            setNewTimelines(saleBuyersTimeline)
        }
    }, [thirdPartyVerification])

    return (

        <div className={styles.container}>
            <div className={styles.desktop_timelines}>
                <div className={styles.left}>
                    <HeaderSubText title="Transaction timeline" />
                    <TimeLine steps={steps} newTimelines={newTimelines} />
                </div>
            </div>
            <div className={styles.right}>
                {
                    thirdPartyVerification ?
                        <>
                            {
                                steps == 1 && <AwaitingApproval handleNext={handleNext} />
                            }
                            {
                                steps === 2 && <StatusReport handleNext={handleNext} />
                            }
                            {
                                steps === 3 && <ConfirmShipment handleNext={handleNext} thirdPartyVerification={Boolean(thirdPartyVerification)} />
                            }
                            {
                                steps === 4 && <CustomRatingFeedback />
                            }
                        </>
                        :
                        <>
                            {
                                steps == 1 && <AwaitingApproval handleNext={handleNext} />
                            }
                            {
                                steps === 2 && <ConfirmShipment handleNext={handleNext} />
                            }
                            {
                                steps === 3 && <CustomRatingFeedback />
                            }
                        </>
                }

            </div>
            <Modal openModal={openModal} setOpenModal={() => setOpenModal(false)} title='Transaction timeline'>
                <TimeLine steps={steps} newTimelines={newTimelines} />
            </Modal>
        </div>

    )
}

export default BuyersTimeline