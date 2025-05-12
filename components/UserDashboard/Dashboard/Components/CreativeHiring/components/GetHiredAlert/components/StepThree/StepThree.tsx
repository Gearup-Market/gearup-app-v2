'use client'
import React, { useState } from 'react'
import styles from './StepThree.module.scss'
import { CustomRadioButton } from '@/shared'
import { BasicPlan, PremiumPlan, StandardPlan } from './components'


enum PlanTypeEnum {
    BASIC_PLAN = 'basic_plan',
    STANDARD_PLAN = 'standard_plan',
    PREMIUM_PLAN = 'premium_plan',
}


const StepThree = () => {
    const [activeType, setActiveType] = useState(PlanTypeEnum.BASIC_PLAN)
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Services & budget</h2>
                <p>Set tailored pricing for your services by offering Basic, Standard, and Premium plans to suit various client needs and budgets.</p>
            </div>
            <ul className={styles.type_lists}>
                {addType.map((item) => (
                    <li key={item.id} className={styles.list}>
                        <CustomRadioButton onChange={() => setActiveType(item.value)} checked={activeType === item.value} addPadding={false} type="radio" id={item.value} name="add_type" value={item.value} />
                        <label htmlFor={item.value}>{item.title}</label>
                    </li>
                ))}
            </ul>
            {activeType === PlanTypeEnum.BASIC_PLAN && <BasicPlan/>}
            {activeType === PlanTypeEnum.STANDARD_PLAN && <StandardPlan/>}
            {activeType === PlanTypeEnum.PREMIUM_PLAN && <PremiumPlan/>}
        </div>
    )
}

export default StepThree

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