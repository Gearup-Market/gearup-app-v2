// components/PayoutForm.tsx
import React, { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './CourseDetails.module.scss';
import { Button, CustomRadioButton, CustomTextEditor, InputField, Select, TextArea } from '@/shared';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText';
import Image from 'next/image';


interface ContentDetailsFormValues {
    title: string;
    subtitle: string;
    description: string;
}

enum CourseType {
    Ebook = 'Ebook/PDF',
    Video = 'Video tutorial',
    Audio = 'Audio tutorial',
    Live = 'Live tutorial',
}

const courseTypes = [
    { label: CourseType.Ebook, value: CourseType.Ebook },
    { label: CourseType.Video, value: CourseType.Video },
    { label: CourseType.Audio, value: CourseType.Audio },
    { label: CourseType.Live, value: CourseType.Live },
];

interface Tag {
    id: string;
    name: string;
}

const CourseDetails: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const inputUploadRef = useRef<HTMLInputElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [currentTag, setCurrentTag] = useState<string>("")
    const initialValues: ContentDetailsFormValues = {
        title: '',
        subtitle: '',
        description: '',

    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        subtitle: Yup.string().required('Subtitle is required'),
        description: Yup.string().required('Description is required'),
    });

    const handleSubmit = (values: ContentDetailsFormValues) => {
        // Handle form submission
        console.log(values);
    };


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const openUploadDialog = () => {
        inputUploadRef.current?.click();
    };

    const handleKeyPress = (event: { key: string; shiftKey: any; preventDefault: () => void }) => {
        // Check if the pressed key is "Enter"
        if (event.key === 'Enter' && !event.shiftKey) {
            // Prevent the default behavior (adding a new line)
            event.preventDefault();
            // Manually submit the form
            // Add a new line to the content
            const newTag = {
                id: Math.random().toString(36).substring(7),
                name: currentTag
            }
            setSelectedTags([...selectedTags, newTag])
            setCurrentTag("")

        }
    };

    const handleDeleteTag = (id: string) => {
        const newTags = selectedTags.filter(tag => tag.id !== id)
        setSelectedTags(newTags)
    }

    return (
        <div className={styles.container}>
            <HeaderSubText title="Course details" description='Add a new course by entering course details' />
            <div className={styles.container__form_container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, setFieldValue, resetForm, isSubmitting }) => (
                        <Form >
                            <div className={styles.container__form_container__form}>
                                <div className={styles.field}>
                                    <InputField label='Title' placeholder='Enter course title' />
                                </div>

                                <div className={styles.field}>
                                    <InputField label='Subtitle' placeholder='E.g From beginner to pro' />
                                </div>
                                <div className={styles.field}>
                                    <CustomTextEditor value={values.description} setValue={(e) => setFieldValue('description', e)} label='Description' placeholder='Enter your course description here...' />
                                </div>
                                <div>
                                    <h2 className={styles.banner_title}>Cover</h2>
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
                                                    <p>Images should be horizontal, at least 1280x720px, and 72 DPI (dots per inch).</p>
                                                </div>
                                        }
                                    </div>
                                    {
                                        selectedImage &&
                                        <Button onClick={openUploadDialog} buttonType='secondary' type="submit">Change image</Button>
                                    }
                                </div>
                                <div>
                                    <h2 className={styles.title}>Course type</h2>
                                    <ul className={styles.flex_fields}>
                                        {
                                            courseTypes.map((courseType, index) => (
                                                <CustomRadioButton key={index} name='courseType' label={courseType.label} value={courseType.value} />
                                            ))
                                        }

                                    </ul>
                                </div>
                                <div className={styles.field}>
                                    <InputField label='Url' placeholder='E.g notion, google drive etc' />
                                </div>
                                <div className={styles.flex_fields}>
                                    <div className={styles.field}>
                                        <InputField label='Duration' placeholder='E.g Ihr 20mins' />
                                    </div>
                                    <div className={styles.field}>
                                        <InputField label='Size' placeholder='Enter video size' />
                                    </div>
                                </div>
                                <div className={styles.field}>
                                    <InputField label='Price' placeholder='Enter amount' />
                                </div>

                            </div>
                        </Form>
                    )}

                </Formik>
                <div className={styles.tags_wrapper}>
                    <h2 className={styles.title}>Add Tags <span className={styles.title_description}>(Add tags that describe your course to allow people find your course easier)</span></h2>
                    <div className={styles.tags_container}>
                        <ul>
                            {
                                selectedTags.map((tag, index) => (
                                    <li key={index} className={styles.tag}>
                                        <p>{tag.name}</p>
                                        <span className={styles.icon_close_container} onClick={() => handleDeleteTag(tag.id)}>
                                            <Image src='/svgs/close-tag.svg' height={10} width={10} alt='close-icon' />
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className={styles.input_container}>
                            <input onKeyDown={handleKeyPress} placeholder='cinematography' type="text" value={currentTag} onChange={(e) => setCurrentTag(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.suggestion_box}>
                        <span className={styles.suggestions}>Suggested: <span className={styles.color_text}> Videography, Photography, Studio Setup & Lighting, Drone Operation & Cinematography, Audio Recording & Sound Engineering, Camera Accessories & Add-ons, Gimbal Stabilization etc</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
