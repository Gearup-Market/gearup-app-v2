'use client'
import React, { useState } from 'react'
import styles from './ServicePlanForm.module.scss'
import { FileUploader, Icon, InputField, Button, Select } from '@/shared'

interface Props {
    formId: number
    onDelete: () => void
    activePlan: string
}

const ServicePlanForm = ({ formId, onDelete, activePlan }: Props) => {
    const [openForm, setOpenForm] = useState(false)
    const [noOfServices, setNoOfServices] = useState(3)

    const handleFileUpload = (files: File) => {
        console.log('Uploaded files:', files);
    };


    const handleAddService = () => {
        setNoOfServices(noOfServices + 1)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h3>{activePlan} {formId}</h3>
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


                        <div className={styles.service_offering}>
                            <div className={styles.service_offering_header}>
                                <div className={styles.header_top}>
                                    <h2>What features does this service offer?</h2>
                                    <Button className={styles.desktop_add_services} onClick={handleAddService} iconPrefix='/svgs/add-color.svg' buttonType="transparent">Add</Button>
                                </div>
                                <p>List the deliverables you will be offering your client based on this service</p>
                            </div>
                            <ul className={styles.services_list}>
                                {
                                    Array.from({ length: noOfServices }).map((_, index) => (
                                        <li key={index + 1} className={styles.service_item}>
                                            <InputField placeholder="Enter service" />

                                            <button onClick={() => setNoOfServices(noOfServices - 1)}>
                                                <Icon src="/svgs/icon-close.svg" />
                                            </button>

                                        </li>
                                    ))
                                }

                            </ul>
                            <Button className={styles.mobile_add_services} onClick={handleAddService} iconPrefix='/svgs/add-color.svg' buttonType="transparent">Add new offer</Button>
                        </div>


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

export default ServicePlanForm

const priceStructure = [
    "per hour",
    "per day",
    "per week",
    "per month"
]