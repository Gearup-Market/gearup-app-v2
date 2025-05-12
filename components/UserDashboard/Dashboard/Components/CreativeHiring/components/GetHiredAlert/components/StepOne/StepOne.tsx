'use client'
import { useState } from 'react'
import styles from './StepOne.module.scss'
import { CustomRadioButton, Button } from '@/shared'
import { AddProjectForm } from './components'

enum AddTypeEnum {
    AddManually = 'add_manually',
    AddFromInstagram = 'add_from_instagram',
}

const StepOne = () => {
    const [activeType, setActiveType] = useState(AddTypeEnum.AddManually)
    const [noOfProjects, setNoOfProjects] = useState(1)

    const handleAddNewProject = () => {
        setNoOfProjects(prevState => prevState + 1)
    }

    const handleDeleteProject = (index: number) => {
        if (noOfProjects > 1) {
            setNoOfProjects(prevState => prevState - 1)
        }
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Add Project(s)</h2>
                <p>Add at least one past project to your portfolio</p>
            </div>
            <ul className={styles.type_lists}>
                {addType.map((item) => (
                    <li key={item.id} className={styles.list}>
                        <CustomRadioButton onChange={() => setActiveType(item.value)} checked={activeType === item.value} addPadding={false} type="radio" id={item.value} name="add_type" value={item.value} />
                        <label htmlFor={item.value}>{item.title}</label>
                    </li>
                ))}
            </ul>
            <div className={styles.form_section}>
                {
                    Array.from({ length: noOfProjects }).map((_, index) => (
                        <AddProjectForm key={index + 1} projectNumber={index + 1} onDelete={() => handleDeleteProject(index + 1)} isInstagramType={activeType === AddTypeEnum.AddFromInstagram} />
                    ))
                }
                <Button onClick={handleAddNewProject} className={styles.add_project_btn} buttonType="transparent" iconPrefix="/svgs/circular-plus-icon.svg">Add another project</Button>
            </div>
        </div>
    )
}

export default StepOne


const addType = [
    {
        id: 1,
        title: 'Add manually',
        value: AddTypeEnum.AddManually,
    },
    {
        id: 2,
        title: 'Add from Instagram',
        value: AddTypeEnum.AddFromInstagram,
    }
]