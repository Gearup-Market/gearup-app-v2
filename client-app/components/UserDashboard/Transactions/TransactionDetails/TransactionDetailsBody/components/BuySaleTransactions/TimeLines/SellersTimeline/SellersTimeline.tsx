'use client'
import React, { useEffect, useState } from 'react'
import styles from './SellersTimeline.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { CheckmarkIcon, LineIcon } from '@/shared/svgs/dashboard'
import { AcceptDecline, AwaitingConfirmation, AwaitingShipment, ConfirmShipment,  Shipment, StatusReport } from './components'
import { saleSellersTimeline, saleSellersTimelineThirdParty, sellersReturnTimeline } from '../../../utils/data'
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

const SellersTimeline = ({ openModal, setOpenModal }: Props) => {
    const [steps, setSteps] = useState(1)
    const [newTimelines, setNewTimelines] = useState<Timeline[]>([])
    const search = useSearchParams()
    const thirdPartyVerification = search.get('third_party')
    const returnGoods = search.get('return_goods')

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
            setNewTimelines(saleSellersTimelineThirdParty)
        } else {
            setNewTimelines(saleSellersTimeline)
        }
    }, [thirdPartyVerification])


    useEffect(() => {
        if (Boolean(returnGoods)) {
            setSteps(1)
            setNewTimelines(sellersReturnTimeline)
        }
    }, [returnGoods])



    return (
        <>
            <div className={styles.container}>
                <div className={styles.desktop_timelines}>
                    <div className={styles.left}>
                        <HeaderSubText title="Transaction timeline" />
                        <TimeLine steps={steps} newTimelines={newTimelines} />
                    </div>
                </div>
                <div className={styles.right}>
                    {
                        Boolean(returnGoods) ?
                            <>
                                {
                                    steps == 1 && <AwaitingShipment handleNext={handleNext} />
                                }
                                {
                                    steps === 2 && <ConfirmShipment handleNext={handleNext} />
                                }
                                {
                                    steps === 3 && <CustomRatingFeedback />
                                }
                            </>
                            :
                            <>
                                {
                                    steps == 1 && <AcceptDecline handleNext={handleNext} />
                                }
                                {
                                    steps === 2 && <Shipment handleNext={handleNext} />
                                }
                                {
                                    steps === 3 && <AwaitingConfirmation />
                                }
                                <>
                                    {
                                        thirdPartyVerification ?
                                            <>
                                                {
                                                    steps === 4 && <StatusReport />
                                                }
                                                {
                                                    steps === 5 && <CustomRatingFeedback />
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    steps === 4 && <CustomRatingFeedback />
                                                }
                                            </>
                                    }
                                </>
                            </>
                    }
                </div>
                <Modal openModal={openModal} setOpenModal={() => setOpenModal(false)} title='Transaction timeline'>
                    <TimeLine steps={steps} newTimelines={newTimelines} />
                </Modal>
            </div>
        </>
    )
}

export default SellersTimeline
