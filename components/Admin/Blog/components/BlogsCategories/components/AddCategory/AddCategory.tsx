import React from 'react'
import styles from './AddCategory.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { Button, InputField } from '@/shared';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { String } from 'lodash';

interface AddMemberProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    category?: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const AddRole = ({ openModal, setOpenModal, category, setCategory }: AddMemberProps) => {

    interface AddCategoryFormValues {
     category: string
    }

    const initialValues: AddCategoryFormValues = {
     category: "",
    };

    const validationSchema = Yup.object().shape({
        category: Yup.string().required('First name is required'),
    });

    const handleSubmit = (values: AddCategoryFormValues ) => {
        setCategory(values.category)
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