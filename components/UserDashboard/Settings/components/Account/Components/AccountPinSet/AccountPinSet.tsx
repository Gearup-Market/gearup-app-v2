// components/PayoutForm.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './AccountPinSet.module.scss';
import { Button, InputField, Select, TextArea } from '@/shared';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText';

interface PayoutFormValues {
    firstName: string;
    lastName: string;
    bank: string;
    accountNumber: string;
}

const AccountPinSet: React.FC = () => {
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
            <HeaderSubText title="Set up account pin" description='Please use a pin you can remember easily' />
            <div className={styles.container__form_container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form >
                        <div className={styles.container__form_container__form}>
                            <div className={styles.form_field}>
                                <InputField label='New account pin' placeholder='Enter 6 digit pin' isPassword />
                            </div>
                            <div className={styles.form_field}>
                                <InputField label='Confirm pin' placeholder='Repeat pin' isPassword />
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

export default AccountPinSet;
