import React, { useState } from 'react'
import styles from './BasicPlan.module.scss'
import { Icon } from '@/shared'
import { BasicPlanForm } from './components'

const BasicPlan = () => {
    const [noOfPlans, setNoOfPlans] = useState(1)

    const handleDeletePlan = (planNumber: number) => {
        if (noOfPlans > 1) {
            setNoOfPlans(noOfPlans - 1)
        }
    }

    const handleAddBasicPlanForm = () => {
        setNoOfPlans(noOfPlans + 1)
    }

    return (
        <div className={styles.container}>
            <button onClick={handleAddBasicPlanForm} className={styles.new_basic_plan_btn}> <Icon src="/svgs/color-add-circle.svg" /> New Basic Plan</button>
            <div className={styles.form_section}>
                {
                    Array.from({ length: noOfPlans }).map((_, index) => (
                        <BasicPlanForm key={index + 1} formId={index + 1} onDelete={() => handleDeletePlan(index + 1)} />
                    ))
                }
            </div>
        </div>
    )
}

export default BasicPlan