import React, { useState } from 'react'
import styles from './ServicePlan.module.scss'
import { Icon } from '@/shared'
import { ServicePlanForm } from './components'

interface Props {
    activePlan: string
}

const ServicePlan = ({ activePlan }: Props) => {
    const [noOfPlans, setNoOfPlans] = useState(1)

    const handleDeletePlan = (planNumber: number) => {
        if (noOfPlans > 1) {
            setNoOfPlans(noOfPlans - 1)
        }
    }

    const handleAddServicePlanForm = () => {
        setNoOfPlans(noOfPlans + 1)
    }

    return (
        <div className={styles.container}>
            <button onClick={handleAddServicePlanForm} className={styles.new_basic_plan_btn}> <Icon src="/svgs/color-add-circle.svg" /> New {activePlan}</button>
            <div className={styles.form_section}>
                {
                    Array.from({ length: noOfPlans }).map((_, index) => (
                        <ServicePlanForm key={index + 1} formId={index + 1} onDelete={() => handleDeletePlan(index + 1)} activePlan={activePlan} />
                    ))
                }
            </div>
        </div>
    )
}

export default ServicePlan