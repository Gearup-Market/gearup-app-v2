// components/PayoutForm.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './SocialsForm.module.scss';
import { Button, InputField, Select, TextArea } from '@/shared';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText';

interface PayoutFormValues {
    linkedin: string;
	facebook: string;
	instagram: string;
	twitter: string;
}

const SocialForm: React.FC = () => {
    const initialValues: PayoutFormValues = {
        linkedin: '',
        facebook: '',
        instagram: '',
        twitter: '',
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
            <HeaderSubText title="Socials" description='Provide links to your social media pages' />
            <div className={styles.container__form_container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form >
                        <div className={styles.container__form_container__form}>
                            <div className={styles.form_field}>
                                <InputField label='Linkedin' placeholder='Enter url' />
                            </div>
                            <div className={styles.form_field}>
                                <InputField label='Facebook' placeholder='Enter url'/>
                            </div>
                            <div className={styles.form_field}>
                                <InputField label='Instagram' placeholder='Enter url' />
                            </div>
                            <div className={styles.phone_field}>
                                <InputField label='Twitter' placeholder='Enter url'/>
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

export default SocialForm;
