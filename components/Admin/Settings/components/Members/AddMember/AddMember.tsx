import React from 'react'
import styles from './AddMember.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { Button, ImageUploader, InputField, Select } from '@/shared';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

interface AddMemberProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMember = ({ openModal, setOpenModal }: AddMemberProps) => {
    const [selectedRole, setSelectedRole] = React.useState<string>('')

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

    const roleOptions = [
        'customer support',
        'designer',
        'footballer'
    ]

    const onOptionChange = (option: any) => {
        setSelectedRole(option.value)
    }
    return (
        <Modal openModal={openModal} setOpenModal={onClose} title='Add Member' description='Add your member that will given access to Gearup portal'>
            <div className={styles.container}>
                <div className={styles.container__form_container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form >
                            <div className={styles.container__form_container__form}>
                                <div className={styles.form_field}>
                                    <InputField label='First name' />
                                </div>
                                <div className={styles.form_field}>
                                    <InputField label='Last name' />
                                </div>
                                <div className={styles.address_field}>
                                    <InputField label='Email' placeholder='enter address' />
                                </div>
                                <div className={styles.address_field}>
                                    <Select label='Role' options={roleOptions} onOptionChange={onOptionChange} />
                                </div>
                            </div>
                            <div className={styles.submit_btn_container}>
                                <Button buttonType='primary' type="submit">Send invitation</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    )
}

export default AddMember