'use client';
import React, { useState, useRef } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import styles from './NewBlog.module.scss';
import { Button, CustomTextEditor, InputField, LoadingSpinner, Select } from '@/shared';
import * as Yup from 'yup';
import { GridAddIcon } from '@mui/x-data-grid';
import { AddCategory } from '../components/BlogsCategories/components';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useGetArticleById, usePostCreateBlog } from '@/app/api/hooks/blogs';
import { useUploadFiles } from '@/app/api/hooks/listings';
import { useAppSelector } from '@/store/configureStore';
import { useSearchParams } from 'next/navigation';

interface NewBlogFormValues {
    title?: string;
    content?: string;
    category?: string;
    readMinutes?: number;
    status?: string;
}

const NewBlog = () => {
    const editingMode = useSearchParams().get('edit_mode');
    const  articleId = useSearchParams().get('blog_id');
    const [showAddCategory, setShowAddCategory] = useState(false);
    const inputUploadRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [category, setCategory] = useState('');
    const { mutateAsync: createBlogPost, isPending: uploadingBlogPost } = usePostCreateBlog();
    const { mutateAsync: uploadImg, isPending: uploadingImg } = useUploadFiles();
    const user = useAppSelector(state => state.user);
    const [isDraft,setIsDraft] = useState(false)
    const {data, isLoading} = useGetArticleById(articleId as string);

    const initialValues: NewBlogFormValues = {
        title: !!editingMode ? data?.title : "",
        content: !!editingMode ? data?.content.text : '',
        category: !!editingMode ? data?.category : '',
        readMinutes:  !!editingMode ? data?.readMinutes : 0,
        status: !!editingMode ? data?.status : "available",  // Add status here
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Blog title is required'),
        content: Yup.string().required('Blog content is required'),
        category: Yup.string().required('Blog category is required'),
        readMinutes: Yup.string().required('Read time is required'),
    });

    const handleSubmit = async (values: NewBlogFormValues, { resetForm }: any, isDraft: boolean) => {
        if (!selectedImage) {
            toast.error('Please upload an image');
            return;
        }

        const status = isDraft ? 'unavailable' : 'available';

        await uploadImg([selectedImage], {
            onSuccess: async (res) => {
                const image = res.imageUrls[0];
                await createBlogPost({
                    ...values,
                    bannerImage: image,
                    user: user.userId,
                    status,  // Set status based on save action
                    content: { text: values.content }
                }, {
                    onSuccess: () => {
                        toast.success(isDraft ? 'Draft saved successfully' : 'Blog post created successfully');
                        setSelectedImage(null);
                        resetForm();
                    },
                    onError: () => {
                        toast.error('Error creating blog post');
                    }
                });
            },
            onError: () => {
                toast.error('Error uploading image');
            }
        });
    };

    const categoryOptions = ['Technology', 'Health', 'Fashion'];

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const openUploadDialog = () => {
        inputUploadRef.current?.click();
    };

    const defaultOptionIndex = categoryOptions.findIndex((option) => option.toLowerCase() === data?.category.toLowerCase());

    return (
        <div className={styles.container}>
            <div className={styles.container__form_container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm }, false)}
                    enableReinitialize
                >
                    {({ errors, touched, setFieldValue, values, resetForm }) => (
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
                                {selectedImage || data?.bannerImage ? (
                                    <div className={styles.image_wrapper}>
                                        <Image src={!!selectedImage ? URL.createObjectURL(selectedImage) : data?.bannerImage ?? ""} alt="image" fill className={styles.image} />
                                    </div>
                                ) : (
                                    <div className={styles.image_placeholder}>
                                        <Image
                                            src='/svgs/icon-image.svg'
                                            height={30}
                                            width={30}
                                            alt='image-icon'
                                            onClick={openUploadDialog}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <p>
                                            Drop your image here, or{' '}
                                            <label onClick={openUploadDialog} className={styles.click_to_upload_text}>
                                                click to upload
                                            </label>
                                        </p>
                                    </div>
                                )}
                            </div>
                            {selectedImage && <Button onClick={openUploadDialog} buttonType='secondary'>Change image</Button>}

                            <div className={styles.container__form_container__form}>
                                <div className={styles.form_field}>
                                    <Field name="title">
                                        {({ field }: any) => (
                                            <InputField label='Title' placeholder='Enter title' {...field} />
                                        )}
                                    </Field>
                                    <ErrorMessage name="title" component="div" className={styles.error_text} />
                                </div>

                                <div className={styles.address_field}>
                                    <Field as="select" name="category">
                                        {({ field }: any) => (
                                            <Select label='Category' options={categoryOptions} defaultOptionIndex={defaultOptionIndex} {...field} onOptionChange={(value) => {
                                                setFieldValue("category", value)
                                            }} />
                                        )}
                                    </Field>
                                    <ErrorMessage name="category" component="div" className={styles.error_text} />
                                    <p className={styles.create_category_text} onClick={() => setShowAddCategory(true)}>
                                        <GridAddIcon /> Create new category
                                    </p>
                                </div>

                                <div className={styles.address_field}>
                                    <Field name="readMinutes">
                                        {({ field }: any) => (
                                            <InputField type='number' label='Read minutes' placeholder='Enter read minutes' {...field} />
                                        )}
                                    </Field>
                                    <ErrorMessage name="readMinutes" component="div" className={styles.error_text} />
                                </div>

                                <div className={styles.address_field}>
                                    <CustomTextEditor
                                        label='Content'
                                        value={values.content ?? ""}
                                        setValue={(value) => setFieldValue("content", value)}
                                        placeholder='type to create content'
                                    />
                                    <ErrorMessage name="content" component="div" className={styles.error_text} />
                                </div>
                            </div>

                            <div className={styles.submit_btn_container}>
                                <Button
                                    buttonType='secondary'
                                    type="button"
                                    onClick={() => {
                                        setIsDraft(true)
                                        handleSubmit(values, { resetForm }, true)}}  // Save draft with unavailable status
                                    className={styles.upload_btn}
                                >
                                    {(uploadingBlogPost || uploadingImg) && isDraft ? <LoadingSpinner size='small' /> : 'Save draft'}
                                </Button>
                                <Button
                                    buttonType='primary'
                                    type="submit" // Create post with available status
                                    className={styles.upload_btn}
                                >
                                    {(uploadingBlogPost || uploadingImg) && !isDraft ? <LoadingSpinner size='small' /> : 'Create post'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <AddCategory openModal={showAddCategory} setOpenModal={setShowAddCategory} category={category} setCategory={setCategory} />
        </div>
    );
};

export default NewBlog;
