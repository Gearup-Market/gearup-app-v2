import React from 'react'
import styles from './AddCategory.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { Button, InputField } from '@/shared';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

interface AddMemberProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRole = ({ openModal, setOpenModal }: AddMemberProps) => {

    interface PayoutFormValues {
        firstName: string;
        lastName: string;
        bank: string;
        accountNumber: string;
    }

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

    const onClose = () => {
        setOpenModal(false)
    }

    return (
        <Modal openModal={openModal} setOpenModal={onClose} title='Create new category' >
            <div className={styles.container}>
                <div className={styles.container__form_container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form >
                            <div className={styles.container__form_container__form}>
                                <div className={styles.address_field}>
                                    <InputField label='Category Name' placeholder='Enter category name' />
                                </div>
                            </div>
                            <div className={styles.submit_btn_container}>
                                <Button buttonType='primary' type="submit">Create Category</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    )
}

export default AddRole