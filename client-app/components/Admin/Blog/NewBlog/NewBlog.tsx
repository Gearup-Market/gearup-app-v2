'use client'
import React, { useState, useRef } from 'react'
import { Form, Formik } from 'formik'
import styles from './NewBlog.module.scss'
import HeaderSubText from '../../HeaderSubText/HeaderSubText'
import { Button, CustomTextEditor, InputField, Select } from '@/shared'
import * as Yup from 'yup'
import { GridAddIcon } from '@mui/x-data-grid'
import { AddCategory } from '../components/BlogsCategories/components'
import Image from 'next/image'

interface NewBlogFormValues {
    title: string;
    content: string;
    category: string;
    time: string;
    image: string;
}

const NewBlog = () => {
    const [showAddCategory, setShowAddCategory] = useState(false)
    const [imageURL, setImageURL] = useState('');
    const inputUploadRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [blogContent, setBlogContent] = useState('');
    const initialValues: NewBlogFormValues = {
        title: '',
        content: '',
        category: '',
        time: '',
        image: ''
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('First name is required'),
        content: Yup.string().required('Last name is required'),
        category: Yup.string().required('Bank is required'),
        time: Yup.string().required('Account number is required'),
    });

    const handleSubmit = (values: NewBlogFormValues) => {
        // Handle form submission
        console.log(values);
    };

    const categoryOptions = [
        'Technology',
        'Health',
        'Fashion'
    ]

    const onOptionChange = (option: any) => {
        console.log(option)
    }


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const openUploadDialog = () => {
        inputUploadRef.current?.click();
    };
    return (
        <div className={styles.container}>
            <div className={styles.container__form_container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <h2 className={styles.banner_title}>Banner Image</h2>
                        <div className={styles.image_container}>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                ref={inputUploadRef}
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                            {
                                selectedImage ?
                                    <div className={styles.image_wrapper}>
                                        <Image src={URL.createObjectURL(selectedImage)} alt="image" fill className={styles.image} />
                                    </div>
                                    :
                                    <div className={styles.image_placeholder}>
                                        <Image src='/svgs/icon-image.svg' height={30} width={30} alt='image-icon' onClick={openUploadDialog} style={{ cursor: 'pointer' }} />
                                        <p>Drop your image here, or <label onClick={openUploadDialog} className={styles.click_to_upload_text}>click to upload </label></p>
                                    </div>
                            }
                        </div>
                        {
                            selectedImage &&
                            <Button onClick={openUploadDialog} buttonType='secondary' type="submit">Change image</Button>
                        }
                        <div className={styles.container__form_container__form}>
                            <div className={styles.form_field}>
                                <InputField label='Title' placeholder='Enter title' />
                            </div>
                            <div className={styles.address_field}>
                                <Select label='Category' options={categoryOptions} onOptionChange={onOptionChange} />
                                <p className={styles.create_category_text} onClick={() => setShowAddCategory(true)}><GridAddIcon /> Create new category</p>
                            </div>
                            <div className={styles.address_field}>
                                <InputField label='Read minutes' placeholder='Enter read minutes' />
                            </div>
                            <div className={styles.address_field}>

                                <CustomTextEditor label='Content' value={blogContent} setValue={setBlogContent} placeholder='type to create content' />
                            </div>
                        </div>
                        <div className={styles.submit_btn_container}>
                            <Button buttonType='secondary' type="submit">Save to draft</Button>
                            <Button buttonType='primary' type="submit">Create post</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <AddCategory openModal={showAddCategory} setOpenModal={setShowAddCategory} />
        </div>

    )
}

export default NewBlog