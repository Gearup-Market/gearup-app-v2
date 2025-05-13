'use client'
import React, { useState } from 'react'
import styles from './ServiceBudgets.module.scss'
import { CustomRadioButton } from '@/shared'
import { ServicePlan } from '@/components/UserDashboard/Dashboard/Components/CreativeHiring/components/GetHiredAlert/components/StepThree/components'


enum PlanTypeEnum {
    BASIC_PLAN = 'basic_plan',
    STANDARD_PLAN = 'standard_plan',
    PREMIUM_PLAN = 'premium_plan',
}

const ServiceBudgets = () => {
    const [activeType, setActiveType] = useState(PlanTypeEnum.BASIC_PLAN)
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Offering information</h2>
                <p>Provide comprehensive information and all the special features of this offering</p>
            </div>
            <ul className={styles.type_lists}>
                {addType.map((item) => (
                    <li key={item.id} className={styles.list}>
                        <CustomRadioButton onChange={() => setActiveType(item.value)} checked={activeType === item.value} addPadding={false} type="radio" id={item.value} name="add_type" value={item.value} />
                        <label htmlFor={item.value}>{item.title}</label>
                    </li>
                ))}
            </ul>
            <ServicePlan activePlan={activeType.replace("_", " ")} />
        </div>
    )
}

export default ServiceBudgets

const addType = [
    {
        id: 1,
        title: 'Basic plan',
        value: PlanTypeEnum.BASIC_PLAN,
    },
    {
        id: 2,
        title: 'Standard plan',
        value: PlanTypeEnum.STANDARD_PLAN,
    },
    {
        id: 3,
        title: 'Premium plan',
        value: PlanTypeEnum.PREMIUM_PLAN,
    }
]