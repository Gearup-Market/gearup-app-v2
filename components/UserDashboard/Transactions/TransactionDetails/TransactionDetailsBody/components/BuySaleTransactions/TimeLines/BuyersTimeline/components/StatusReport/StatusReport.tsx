'use client';
import React, { useState } from 'react'
import styles from './StatusReport.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText';
import { Button } from '@/shared';
import RefundModal from './RefundModal/RefundModal';
import { TransactionStage, TransactionStatus } from '@/interfaces';

interface Props {
    handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
}

const StatusReport = ({ handleNext }: Props) => {
    const [showRefundModal, setShowRefundModal] = useState(false)
    const isGood = true

    return (
        <div className={styles.container}>
            <div className={styles.container_top}>
                <div className={styles.header_container}>
                    <HeaderSubText title="Status Report" />
                </div>
                {
                    !isGood ?
                        <>
                            <div className={styles.details_container}>
                                <h2>
                                    Gear in perfect condition!
                                </h2>
                                <div>
                                    <h3>
                                        Inspection Summary:
                                    </h3>
                                    <p>
                                        The Gearup-certified service center has completed a comprehensive inspection of the gear listed for a third-party check. The detailed assessment reveals that the equipment is in excellent condition, meeting all specified criteria.Gear in perfect condition! Inspection Summary: The Gearup-certified service center has completed a comprehensive inspection of the gear listed for a third-party check. The detailed assessment reveals that the equipment is in excellent condition, meeting all specified criteria.
                                    </p>
                                </div>
                                <div>
                                    <h3>
                                        Condition Assessment:
                                    </h3>
                                    <ul>
                                        <li> Exterior: No visible damages or signs of wear. </li>
                                        <li>Functionality: All components and features are in optimal working condition. </li>
                                        <li>Technical Specifications: The gear meets the manufacturer&apos;s specifications. </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>Recommendation</h3>
                                    <p> The equipment has passed all quality checks and is deemed suitable for purchase. The buyer can proceed with confidence, knowing that the gear has undergone a thorough inspection and is in perfect condition.</p>
                                </div>
                            </div>
                            <div className={styles.details_container}>
                                <p>
                                    Your equipment will be processed for shipment immediately
                                </p>
                            </div>
                            <div className={styles.btn_container}>
                                <Button onClick={handleNext}>Proceed</Button>
                            </div>
                        </>
                        :
                        <>
                            <div className={styles.details_container}>
                                <h2>
                                    Faults discovered!
                                </h2>
                                <div>
                                    <h3>
                                        Inspection Summary:
                                    </h3>
                                    <p>
                                        The Gearup-certified service center has completed a detailed inspection of the gear listed for a third-party check. Unfortunately, certain faults and issues have been identified during the assessment.
                                    </p>
                                </div>
                                <div>
                                    <h3>
                                        Condition Assessment:
                                    </h3>
                                    <ul>
                                        <li>Exterior: Scratches and visible damages on the surface.  </li>
                                        <li> Functionality: Issues with specific components, affecting overall performance.</li>
                                        <li>
                                            Technical Specifications: Deviations from the manufacturer&apos;s specifications.
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>Recommendation</h3>
                                    <p>Given the identified faults, the buyer is advised to carefully consider the condition of the equipment before proceeding with the purchase. Additional details on the discovered issues have been provided to assist the buyer in making an informed decision.</p>
                                </div>
                            </div>
                            <div className={styles.details_container}>
                                <p>
                                    Your refund will be processed immediately
                                </p>
                            </div>
                            <div className={styles.btn_container}>
                                <Button onClick={() => setShowRefundModal(true)}>Request a refund</Button>
                            </div>
                        </>
                }
            </div>
            <RefundModal openModal={showRefundModal} setOpenModal={setShowRefundModal} />
        </div>
    )
}

export default StatusReport