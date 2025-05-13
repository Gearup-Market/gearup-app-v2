'use client'
import React, { useState } from 'react'
import styles from './ServicesPricing.module.scss'
import { PlanTypeEnum, addPlanType } from '@/components/UserDashboard/Dashboard/Components/CreativeHiring/components/GetHiredAlert/components/StepThree/StepThree'
import { CustomImage, Button } from '@/shared'

const ServicesPricing = () => {
    const [activeType, setActiveType] = useState(PlanTypeEnum.BASIC_PLAN)
    return (
        <div className={styles.container}>
            <ul className={styles.type_lists}>
                {addPlanType.map((item) => (
                    <li key={item.id} className={styles.list} data-active={item.value === activeType} onClick={() => setActiveType(item.value)}>
                        <label htmlFor={item.value}>{item.title}</label>
                    </li>
                ))}
            </ul>
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <h2>Basic Photography Package</h2>
                    <p>25 photographs for your events and marketing services</p>
                </div>
                <div className={styles.header_amount}><span className={styles.amount}>$2</span>/day</div>
            </div>
            <div className={styles.image_container}>
                <CustomImage src="/images/camera-operator-img.png" alt="service image" fill objectFit='cover' className={styles.image} />
            </div>

            <ul className={styles.services_list}>
                {
                    sampleServices.map((service) => (
                        <li key={service.id} className={styles.list}>
                            <CustomImage src="/svgs/check-circle.svg" alt="check" width={20} height={20} className={styles.check_icon} />
                            <p>{service.title}</p>
                        </li>
                    ))
                }
            </ul>
            <Button>Continue</Button>
        </div>
    )
}

export default ServicesPricing

const sampleServices = [
    {
        id: 1,
        title: 'Basic editing including color correction and cropping.',
    },
    {
        id: 2,
        title: 'High-resolution images delivered through a secure online gallery.',
    },
    {
        id: 3,
        title: 'Optimized images for social media sharing.',
    },
    {
        id: 4,
        title: ' 7-10 business days.',
    },
]