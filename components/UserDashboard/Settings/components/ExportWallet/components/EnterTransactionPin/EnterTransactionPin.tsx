import React from 'react'
import styles from './EnterTransactionPin.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, InputField } from '@/shared';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/store/configureStore';
import * as Yup from 'yup';

interface PinFormValues {
    accountPin: string;
}

interface Props{
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
const EnterTransactionPin = ({openModal, setOpenModal}:Props) => {
    const user = useAppSelector(state => state.user);

    const initialValues: PinFormValues = {
        accountPin: '',
    };

    const validationSchema = Yup.object().shape({
        accountPin: Yup.string()
            .required('New account pin is required')
            .matches(/^\d{6}$/, 'Pin must be exactly 6 digits'),
    });

    const handleSubmit = async  (values: PinFormValues, { resetForm }: { resetForm: () => void }) => {
      /*   try {
            const resp = await postUpdateUser({ userId: user._id, pin:values.accountPin }, {
                onSuccess: (value) => {
                    toast.success('Pin updated successfully');
                    resetForm()
                },
                onError: () => {
                    toast.error('An error occurred while updating your account pin');
                },
            });
        } catch (error) {
            console.error('Submit error:', error);
        } */
    };


    const onClose = () => {
        setOpenModal(false)
    }
  return (
    <Modal title='Transaction pin' openModal={openModal} setOpenModal={onClose} >
        <div className={styles.container}>
        <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={styles.container__form_container}>
                                <div className={styles.form_field}>
                                    <Field
                                        name="accountPin"
                                        as={InputField}
                                        placeholder="Enter transaction pin "
                                        isPassword
                                    />
                                    <ErrorMessage
                                        name="accountPin"
                                        component="div"
                                        className={styles.error_message}
                                    />
                                </div>
                                
                            <div className={styles.submit_btn_container}>
                                <Button
                                    buttonType="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                    >
                                    {isSubmitting ? 'Saving...' : 'Proceed'}
                                </Button>
                            </div>

                            <div className={styles.forgot_pin_container}>
                                <p>Forgot pin? <span className={styles.contact_support}>Contact support</span></p>
                            </div>
                                    </div>
                        </Form>
                    )}
                </Formik>
        </div>
    </Modal>
  )
}

export default EnterTransactionPin