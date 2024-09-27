// components/PayoutForm.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './HelpCenter.module.scss';
import { Button, InputField, TextArea } from '@/shared';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText';

interface PayoutFormValues {
    firstName: string;
    lastName: string;
    bank: string;
    accountNumber: string;
}

const HelpCenter: React.FC = () => {
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
            <HeaderSubText title="Help center" description='How can we hep you?' />
            <div className={styles.container__form_container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form >
                        <div className={styles.container__form_container__form}>
                            <div className={styles.form_field}>
                                <InputField label='Username' placeholder='Enter username' />
                            </div>
                            <div className={styles.form_field}>
                                <InputField label='Email address' placeholder='Enter email address'/>
                            </div>
                            <div className={styles.form_field}>
                                <InputField label='Subject' placeholder='Enter subject' />
                            </div>
                            <div className={styles.text_area_container}>
                                <TextArea rows={6} className={styles.text_area} label='Description' placeholder='Enter description here' />
                            </div>
                        </div>
                        <div className={styles.submit_btn_container}>
                            <Button disabled buttonType='primary' type="submit">Submit</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default HelpCenter;
