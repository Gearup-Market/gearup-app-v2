import React from 'react'
import styles from './Shipment.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/shared'

interface Props {
    handleNext: () => void

}
const Shipment = ({ handleNext }: Props) => {
    const search = useSearchParams()
    const thirdPartyVerification = search.get('third_party')

    return (
        <div className={styles.container}>
            <div className={styles.container_top}>
                <HeaderSubText title="Shipment" />
                {
                    thirdPartyVerification &&
                    <div className={styles.details_container}>
                        <p className={styles.details}>
                            Please follow the <span className={styles.colored_text}> gearup service center guidelines </span> to properly ship your equipment</p>
                    </div>
                }
                <div className={styles.details_container}>
                    <p className={styles.details}>
                        Please make sure you’ve successfully shipped the gear to the buyer before confirming shipment </p>
                </div>
                <div className={styles.summary_container}>
                    <h3 className={styles.title}>Shipment details</h3>
                    <div className={styles.summary_item}>
                        <h4>Full-name</h4>
                        <p>
                            {
                                thirdPartyVerification ? 'Gearup service center' : 'Wade Warren'
                            }
                        </p>
                    </div>
                    <div className={styles.summary_item}>
                        <h4>Shipment type</h4>
                        <p>Shipment</p>
                    </div>
                    <div className={styles.summary_item}>
                        <h4>Country</h4>
                        <p>Nigeria</p>
                    </div>
                    <div className={styles.summary_item}>
                        <h4>City</h4>
                        <p>Lagos, Nigeria</p>
                    </div>
                    <div className={styles.summary_item}>
                        <h4>Shipment address</h4>
                        <span className={styles.ellipse_container}>
                            <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                        </span>
                    </div>
                    <div className={styles.summary_item}>
                        <h4>Mobile number</h4>
                        <p>(480) 555-0103</p>
                    </div>
                </div>
            </div>
            <div className={styles.btn_container}>
                <Button onClick={handleNext}>Confirm Shipment</Button>
            </div>
        </div>
    )
}

export default Shipment