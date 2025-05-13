'use client'
import React, { useState } from 'react'
import styles from './AddProjectModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { AddProjectForm } from '@/components/UserDashboard/Dashboard/Components/CreativeHiring/components/GetHiredAlert/components/StepOne/components'
import { Button } from '@/shared'
import { AddTypeEnum } from '@/components/UserDashboard/Dashboard/Components/CreativeHiring/components/GetHiredAlert/components/StepOne/StepOne'

interface Props {
    openModal: boolean
    onClose: () => void
    addType: string
}

const AddProjectModal = ({ openModal, onClose, addType }: Props) => {
    const [noOfProjects, setNoOfProjects] = useState(1)
    const isInstagram = addType === AddTypeEnum.AddFromInstagram

    const handleAddNewProject = () => {
        setNoOfProjects(prevState => prevState + 1)
    }

    const handleDeleteProject = (index: number) => {
        if (noOfProjects > 1) {
            setNoOfProjects(prevState => prevState - 1)
        }
    }

    const handleSaveProceed = () => {
            onClose()
        
    }

    return (
        <Modal
            title=""
            openModal={openModal}
            setOpenModal={onClose}
            className={styles.container}>
            <div className={styles.header}>
                <h2>Add Project(s) {isInstagram  && "from Instagram"}</h2>
                <p>Add at least one past project to your portfolio</p>
            </div>
            <div className={styles.form_section}>
                {
                    Array.from({ length: noOfProjects }).map((_, index) => (
                        <AddProjectForm key={index + 1} projectNumber={index + 1} onDelete={() => handleDeleteProject(index + 1)} isInstagramType={addType === AddTypeEnum.AddFromInstagram} />
                    ))
                }
                <Button onClick={handleAddNewProject} className={styles.add_project_btn} buttonType="transparent" iconPrefix="/svgs/circular-plus-icon.svg">Add another project</Button>
            </div>
            <Button onClick={handleSaveProceed} className={styles.save_proceed_btn}>Save project</Button>
        </Modal>
    )
}

export default AddProjectModal