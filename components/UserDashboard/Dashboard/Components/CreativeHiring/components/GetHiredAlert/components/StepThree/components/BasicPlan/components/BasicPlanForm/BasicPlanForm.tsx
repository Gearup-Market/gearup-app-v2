'use client'
import React, { useState } from 'react'
import styles from './BasicPlanForm.module.scss'
import { FileUploader, Icon, InputField, Button, Select } from '@/shared'

interface Props {
    formId: number
    onDelete: () => void
}

const BasicPlanForm = ({ formId, onDelete }: Props) => {
    const [openForm, setOpenForm] = useState(false)

    const handleFileUpload = (files: File) => {
        console.log('Uploaded files:', files);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h3>Basic plan {formId}</h3>
                    <button data-active={openForm} onClick={() => setOpenForm(!openForm)}>
                        <Icon src="/svgs/chevron-down.svg" />
                    </button>
                </header>
                {
                    openForm &&
                    <div className={styles.form}>
                        <InputField label="Project title" placeholder="Enter project title" />
                        <InputField label="Description" placeholder="Enter description" />
                        <FileUploader onFileSelect={handleFileUpload} label="Cover image(Use only relevant images that reflect the service you are offering)" />
                        <div className={styles.service_offering}></div>
                        <div className={styles.pricing_container}>
                            <div className={styles.price_header}>
                                <h2>Price</h2>
                                <p>Provide a pricing to this service</p>
                            </div>
                            <InputField label="Price" placeholder="Enter amount" />
                            <Select label="Price structure" options={priceStructure} />
                        </div>
                        <Button buttonType="primary" className={styles.save_btn}>Save changes</Button>
                    </div>
                }
            </div>
            <button onClick={onDelete}>
                <Icon src="/svgs/trash.svg" />
            </button>

        </div>
    )
}

export default BasicPlanForm

const priceStructure = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]