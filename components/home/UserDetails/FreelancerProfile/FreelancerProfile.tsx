import React, { useState } from 'react'
import styles from './FreelancerProfile.module.scss'
import { FreelancerBio, FreelancerSkills, FreelancerProjects, FreelancerServicesPricing } from './components'


enum ProfileHeadersEnum {
    Bio = 'Bio',
    Skills = 'Skills',
    ServicesPricing = 'Services & Pricing',
    Projects = 'Projects',
}

const FreelancerProfile = () => {
    const [activeHeader, setActiveHeader] = useState(ProfileHeadersEnum.Bio)

    const handleHeaderClick = (header: ProfileHeadersEnum) => {
        setActiveHeader(header)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HeaderItem title={ProfileHeadersEnum.Bio} onClick={() => handleHeaderClick(ProfileHeadersEnum.Bio)} isActive={activeHeader === ProfileHeadersEnum.Bio} />
                <HeaderItem title={ProfileHeadersEnum.Projects} onClick={() => handleHeaderClick(ProfileHeadersEnum.Projects)} isActive={activeHeader === ProfileHeadersEnum.Projects} />
                <HeaderItem title={ProfileHeadersEnum.Skills} onClick={() => handleHeaderClick(ProfileHeadersEnum.Skills)} isActive={activeHeader === ProfileHeadersEnum.Skills} />
                <HeaderItem title={ProfileHeadersEnum.ServicesPricing} onClick={() => handleHeaderClick(ProfileHeadersEnum.ServicesPricing)} isActive={activeHeader === ProfileHeadersEnum.ServicesPricing} />
            </div>
            <div className={styles.content}>
                {
                    activeHeader === ProfileHeadersEnum.Bio && <FreelancerBio />
                }
                {
                    activeHeader === ProfileHeadersEnum.Projects && <FreelancerProjects />
                }
                {
                    activeHeader === ProfileHeadersEnum.Skills && <FreelancerSkills />
                }
                {
                    activeHeader === ProfileHeadersEnum.ServicesPricing && <FreelancerServicesPricing />
                }
            </div>
        </div>
    )
}

export default FreelancerProfile


interface HeaderItemProp {
    onClick: () => void;
    title: string;
    isActive: boolean
}

const HeaderItem = ({ title, onClick, isActive }: HeaderItemProp) => {
    return (
        <button className={styles.header_item} onClick={onClick} data-active={isActive}>
            <h2>{title}</h2>
        </button>
    )
}