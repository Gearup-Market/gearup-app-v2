import React from 'react';
import styles from './AddMember.module.scss';
import Modal from '@/shared/modals/modal/Modal';
import { Button, InputField, Select } from '@/shared';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface AddMemberProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMember = ({ openModal, setOpenModal }: AddMemberProps) => {
    const roleOptions = [
        { value: 'customer support', label: 'Customer Support' },
        { value: 'designer', label: 'Designer' },
        { value: 'footballer', label: 'Footballer' },
    ];

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '', 
        bank: '',
        accountNumber: '',
        password: '',
        confirmPassword: '',
        role: '', 
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'), // Added email validation
        bank: Yup.string().required('Bank is required'),
        accountNumber: Yup.string()
            .required('Account number is required')
            .matches(/^\d+$/, 'Account number must be numeric'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
        role: Yup.string().required('Role is required'), // Role validation
    });

    const handleSubmit = (values: any) => {
        // Handle form submission
        console.log(values);
    };

    const onClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal openModal={openModal} setOpenModal={onClose} title='Add Member' description='Add your member that will be given access to the Gearup portal'>
            <div className={styles.container}>
                <div className={styles.container__form_container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className={styles.container__form_container__form}>
                                    <div className={styles.form_field}>
                                        <InputField name='firstName' label='First Name' placeholder='Enter first name'/>
                                        <ErrorMessage name="firstName" component="div" className={styles.error} />
                                    </div>
                                    <div className={styles.form_field}>
                                        <InputField name='lastName' label='Last Name' placeholder='Enter last name'/>
                                        <ErrorMessage name="lastName" component="div" className={styles.error} />
                                    </div>
                                    <div className={styles.form_field}>
                                        <InputField name='email' label='Email' placeholder='Enter email address' />
                                        <ErrorMessage name="email" component="div" className={styles.error} />
                                    </div>
                                    <div className={styles.form_field}>
                                        <Select
                                            label='Role'
                                            options={roleOptions}
                                            onOptionChange={(option) => setFieldValue('role', option.value)} // Bind the selected role to Formik state
                                        />
                                        <ErrorMessage name="role" component="div" className={styles.error} />
                                    </div>
                    
                                    <div className={styles.form_field}>
                                        <InputField type='password' name='password' label='Password' placeholder='Password (Min. of 8 characters)'/>
                                        <ErrorMessage name="password" component="div" className={styles.error} />
                                    </div>
                                    <div className={styles.form_field}>
                                        <InputField type='password' name='confirmPassword' label='Confirm Password' placeholder=' Repeat password' />
                                        <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
                                    </div>
                                </div>
                                <div className={styles.submit_btn_container}>
                                    <Button buttonType='primary' type="submit">Create Admin </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddMember;
