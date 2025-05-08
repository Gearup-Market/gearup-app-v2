'use client'
import React from 'react'
import styles from './AddProjectForm.module.scss'
import { CustomTextEditor, Icon, InputField } from '@/shared'


interface Props {
    projectNumber: number
    onDelete: () => void
}

const AddProjectForm = ({ projectNumber, onDelete }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Project {projectNumber}</h2>
                {
                    projectNumber !== 1 &&
                    <button onClick={onDelete}>
                        <Icon src="/svgs/trash.svg" />
                    </button>
                }
            </div>
            <div className={styles.form}>
                <InputField label="Project title" />
                <CustomTextEditor
                    label="Description"
                    value={""}
                    setValue={value =>
                        console.log(value)
                    }
                    placeholder="Type here..."
                />
            </div>
        </div>
    )
}

export default AddProjectForm