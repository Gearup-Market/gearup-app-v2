'use client'
import React, { useState } from 'react'
import styles from './Projects.module.scss'
import Image from 'next/image'
import { Icon } from '@/shared'
import { AddProjectModal } from './components'
import { AddTypeEnum } from '@/components/UserDashboard/Dashboard/Components/CreativeHiring/components/GetHiredAlert/components/StepOne/StepOne'

const Projects = () => {
    const [openAddProjectModal, setOpenAddProjectModal] = useState(false)
    const [addProjectType, setAddProjectType] = useState("")

    const onClose = () => {
        setOpenAddProjectModal(false)
    }

    const openModal = (type: string) => {
        setAddProjectType(type)
        setOpenAddProjectModal(true)
    }

    return (
        <div className={styles.container}>
            <ul className={styles.type_lists}>
                {
                    addProjectTypes.map((project) => (
                        <button onClick={() => openModal(project.value)} className={styles.project_type} key={project.id}>
                            <Image src={project.icon} alt={project.title} height={30} width={30} />
                            <div className={styles.project_info}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                            </div>
                            <Icon className={styles.chevron} src="/svgs/chevron-rightbtn.svg" />
                        </button>
                    ))
                }
            </ul>
            <div className={styles.projects_section}>

                <div className={styles.empty_projects_list}>
                    <Icon className={styles.add_icon} src="/images/document-text.png" />
                    <h3>No Project Added Yet</h3>
                    <p>Added projects will be displayed here</p>
                </div>

            </div>
            <AddProjectModal openModal={openAddProjectModal} onClose={onClose} addType={addProjectType} />
        </div>
    )
}

export default Projects



const addProjectTypes = [
    {
        id: 1,
        title: "Add projects from instagram",
        description: "Upload links to projects you’ve posted on instagram",
        value: AddTypeEnum.AddFromInstagram,
        icon: "/images/instagram-icon.png"
    },
    {
        id: 2,
        title: "Add projects manually",
        description: "Manually update your past projects",
        value: AddTypeEnum.AddManually,
        icon: "/images/pen-icon.png"
    },
]