'use client'
import React from 'react'
import styles from './AddProjectForm.module.scss'
import { CustomTextEditor, FileUploader, Icon, InputField } from '@/shared'


interface Props {
    projectNumber: number
    onDelete: () => void
}

const AddProjectForm = ({ projectNumber, onDelete }: Props) => {

    const handleFileUpload = (files: File) => {
        console.log('Uploaded files:', files);
    };

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
                <FileUploader onFileSelect={handleFileUpload} label="Cover image" />
                <FileUploader onFileSelect={handleFileUpload} label="Upload images/videos" text="1600 x 1200 (4:3) recommended, up to 10mb each" accept="image/*,video/*" />
            </div>
        </div>
    )
}

export default AddProjectForm