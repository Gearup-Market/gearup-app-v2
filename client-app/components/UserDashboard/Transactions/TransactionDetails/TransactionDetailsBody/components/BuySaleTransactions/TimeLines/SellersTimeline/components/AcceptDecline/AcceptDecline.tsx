'use client'
import React, { useState } from 'react'
import styles from './AcceptDecline.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { Button } from '@/shared'
import {useSearchParams} from 'next/navigation'

interface Props {
    handleNext: () => void
}
const AcceptDecline = ({ handleNext }: Props) => {
    const [isCancelled, setIsCancelled] = useState(false)
    const search  = useSearchParams()
    const thirdPartyVerification = search.get('third_party')
    return (
        <div className={styles.container}>
            <div className={styles.container_top}>
                <HeaderSubText title="Awaiting approval" />
                {
                    isCancelled ?

                        <div className={styles.details_container}>
                            <p className={styles.details}>
                                You’ve declined this transaction and the fund in the escrow protection will be refunded to the buyer
                            </p>
                        </div>
                        :
                        <>
                            <div className={styles.details_container}>
                                <p className={styles.details}>
                                    <span className={styles.bold}>Wade Warren</span> has successfully paid the sum of <span className={styles.bold}>$400</span> for the purchase of Canon EOS R5 Camera, and the money is in escrow protection, which will be released to you once the transaction is completed </p>
                            </div>
                            {
                                !thirdPartyVerification ?
                                    <div className={styles.details_container}>
                                        <p className={styles.details}>
                                            The buyer has opted for the &apos;&apos;<span className={styles.learn_more}>Third-Party Check</span>&apos;&apos; service during the purchasing process. You will be required to ship the gear to Gearup service center for inspection
                                        </p>
                                    </div>
                                    :
                                    <>
                                        <div className={styles.details_container}>
                                            <p className={styles.details}>
                                                Buyers have the right to Return policy and the choice to opt for Third-Party Verification when making a purchase. Hence, we mandate that by accepting this transaction, you are agreeing to the 48-hour return policy</p>
                                        </div>
                                        <div className={styles.details_container}>
                                            <p className={styles.details}>
                                                Your payment will be processed after the 48hours return period has elapsed, if the buyer did not initiate a return request
                                            </p>
                                        </div>
                                    </>
                            }
                        </>
                }
            </div>
            {
                !isCancelled &&
                <div className={styles.btn_container}>
                    <Button className={styles.cancel_btn} onClick={() => setIsCancelled(true)} buttonType='secondary'>Decline</Button>
                    <Button onClick={handleNext}>Accept</Button>
                </div>
            }
        </div>
    )
}

export default AcceptDecline