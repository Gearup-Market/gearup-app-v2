import React from 'react'
import styles from './BuyRentListing.module.scss'
import { Button } from '@/shared'
import { ImageSlider } from '@/components/listing'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'

const BuyRentListing = () => {
    return (
        <div className={styles.left_container}>
            <ImageSlider />
            <div className={styles.details_container}>
                <HeaderSubText title='Samyang AF 14mm F2.8 RF' variant='normal' />
                <div>
                    <div>
                        <div className={styles.summary_item}>
                            <h4>Category</h4>
                            <p>Lenses</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>Production type</h4>
                            <p>Still and Video</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>Sensor size</h4>
                            <p>APS-C (Super 35 mm)</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>Focal length</h4>
                            <p>14mm</p>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className={styles.summary_item}>
                            <h4>Sub category</h4>
                            <p>Prime</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>Brand</h4>
                            <p>Samyang</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>Focal type</h4>
                            <p>Auto</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>Image stabilization</h4>
                            <p>Yes</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>Use cases</h4>
                            <p>Cinematography, Live streaming, Interviews, documentary</p>
                        </div>
                        <div className={styles.summary_item}>
                            <div>
                                <h4>Use cases</h4>
                                <div className={styles.btns_container}>
                                    <Button className={styles.view_btn} iconSuffix='/svgs/btn-check.svg'>Cinematography</Button>
                                    <Button className={styles.view_btn} iconSuffix='/svgs/btn-check.svg'>Concert</Button>
                                </div>
                            </div>
                            <p></p>
                        </div>
                        <div className={styles.summary_item}>
                            <div>
                                <h4>Type</h4>
                                <div className={styles.btns_container}>
                                    <Button className={styles.view_btn} iconSuffix='/svgs/btn-check.svg'>Wide angle</Button>
                                </div>
                            </div>
                            <p></p>
                        </div>
                        <div className={styles.summary_item}>
                            <div>
                                <h4>Mount</h4>
                                <div className={styles.btns_container}>
                                    <Button className={styles.view_btn} iconSuffix='/svgs/btn-check.svg'>Canon RF</Button>
                                </div>
                            </div>
                            <p></p>
                        </div>

                    </div>
                    <div>
                        <div className={styles.summary_item}>
                            <p style={{ fontSize: "1.2rem" }}>PRICING</p>
                        </div>

                        <div className={styles.summary_item}>
                            <h4>Daily price (Including VAT)</h4>
                            <p>$40</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>3 days offer (Including VAT)</h4>
                            <p>$40</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>7 Days offer (Including VAT)</h4>
                            <p>$40</p>
                        </div>
                        <div className={styles.summary_item}>
                            <h4>30 Days offer (Including VAT)</h4>
                            <p>$40</p>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.summary_item}>
                        <h4>Total replacement amount (Including VAT):</h4>
                        <p>$40</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BuyRentListing