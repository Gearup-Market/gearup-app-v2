// components/PayoutForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './PersonalInfo.module.scss';
import { Button, ImageUploader, InputField, Select, TextArea } from '@/shared';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText';

interface PayoutFormValues {
    firstName: string;
    lastName: string;
    bank: string;
    accountNumber: string;
}

const PersonalInfoForm: React.FC = () => {
    const initialValues: PayoutFormValues = {
        firstName: '',
        lastName: '',
        bank: '',
        accountNumber: '',
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        bank: Yup.string().required('Bank is required'),
        accountNumber: Yup.string()
            .required('Account number is required')
            .matches(/^\d+$/, 'Account number must be numeric'),
    });

    const handleSubmit = (values: PayoutFormValues) => {
        // Handle form submission
        console.log(values);
    };

    return (
        <div className={styles.container}>
            <HeaderSubText title="Profile information" description="Please provide the necessary personal information" />
            <div className={styles.container__form_container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form >
                        <div className={styles.uploader_container}>
                            <ImageUploader />
                            <h3 className={styles.name}>Einstein130</h3>
                            <p className={styles.email}>Einstein.oyakhilome1@gmail.com</p>
                        </div>
                        <div className={styles.container__form_container__form}>
                            <div className={styles.form_field}>
                                <InputField label='First name' />
                            </div>
                            <div className={styles.form_field}>
                                <InputField label='Last name' />
                            </div>
                            <div className={styles.form_field}>
                                <InputField label='Display name' />
                            </div>
                            <div className={styles.phone_field}>
                                <InputField
                                    label='Phone number'
                                    customPrefix={
                                        <p className={styles.prefix_container}>
                                            +234 <span className={styles.prefix_divider}></span>
                                        </p>
                                    }
                                    type='number'
                                />
                            </div>
                            <div className={styles.address_field}>
                                <InputField label='Address' placeholder='enter address' />
                            </div>
                            <div className={styles.map_container}>
                                map
                            </div>
                            <div className={styles.text_area_container}>
                                <TextArea rows={6} className={styles.text_area} label='About' placeholder='Tell us about yorself...' />
                            </div>
                        </div>
                        <div className={styles.submit_btn_container}>
                            <Button disabled buttonType='primary' type="submit">Save changes</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default PersonalInfoForm;
