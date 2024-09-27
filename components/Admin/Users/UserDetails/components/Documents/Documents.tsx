import React from 'react'
import styles from './Documents.module.scss'
const Documents = () => {
    return (
        <div className={styles.container}>
            <div className={styles.container__summary_container}>
                <h3 className={styles.title}>Documents</h3>
                <div className={styles.summary_item}>
                    <h4>ID type</h4>
                    <p>Passport</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>ID number</h4>
                    <p>454038890304853</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>BVN</h4>
                    <p>454038890304853</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Phone number</h4>
                    <p>(307) 555-0133</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Full name</h4>
                    <p>Annette Black</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Country</h4>
                    <p>Driver’s License</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Address</h4>
                    <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>City</h4>
                    <p>Pembroke Pines</p>
                </div>
                <div className={styles.summary_item}>
                    <h4>Postal code</h4>
                    <p>3334232</p>
                </div>
            </div>
        </div>
    )
}

export default Documents