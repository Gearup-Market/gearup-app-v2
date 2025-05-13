'use client'
import React, { useState } from 'react'
import styles from './CareerInfo.module.scss'
import { ProfessionalProfile, Projects, ServiceBudgets } from './components'

enum CareerInfoTabsEnum {
    Projects = "Projects",
    ProfessionalProfile = "professional_profile",
    ServicesAndBudget = "services_budget",
}

const CareerInfo = () => {
    const [activeTab, setActiveTab] = useState(CareerInfoTabsEnum.Projects)

    return (
        <div className={styles.container}>
            <ul className={styles.tabs_lists}>
                {
                    CareerInfoTabs.map((tab) => (
                        <li key={tab.id} className={styles.tab} data-active={activeTab === tab.value} onClick={() => setActiveTab(tab.value)}>
                            {tab.label}
                        </li>
                    ))
                }
            </ul>
            <div className={styles.tabs_items}>
                {activeTab === CareerInfoTabsEnum.Projects && <Projects />}
                {activeTab === CareerInfoTabsEnum.ProfessionalProfile && <ProfessionalProfile />}
                {activeTab === CareerInfoTabsEnum.ServicesAndBudget && <ServiceBudgets />}
            </div>
        </div>
    )
}

export default CareerInfo

const CareerInfoTabs = [
    {
        id: 1,
        label: "Projects",
        value: CareerInfoTabsEnum.Projects,
    },
    {
        id: 2,
        label: "Professional Profile",
        value: CareerInfoTabsEnum.ProfessionalProfile,
    },
    {
        id: 3,
        label: "Services & budget",
        value: CareerInfoTabsEnum.ServicesAndBudget,
    },
]