import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AccountPinSet.module.scss';
import { Button, InputField } from '@/shared';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText';
import { useAppSelector } from '@/store/configureStore';
import { usePostUpdateUser } from '@/app/api/hooks/users';
import toast from 'react-hot-toast';

interface PinFormValues {
    currentPin?: string;
    accountPin: string;
    confirmPin: string;
}

interface Props{
    inModal?: boolean;
}

const AccountPinSet: React.FC<Props> = ({inModal=false}) => {
    const user = useAppSelector(state => state.user);
    const { mutateAsync: postUpdateUser, isPending } = usePostUpdateUser();
    const initialValues: PinFormValues = {
        accountPin: '',
        confirmPin: '',
        currentPin: '',
    };

    console.log(user,"user")

    const validationSchema = Yup.object().shape({
        accountPin: Yup.string()
            .required('New account pin is required')
            .matches(/^\d{6}$/, 'Pin must be exactly 6 digits'),
        confirmPin: Yup.string()
            .oneOf([Yup.ref('accountPin')], 'Pins do not match')
            .required('Please confirm your pin'),
    });

    const handleSubmit = async  (values: PinFormValues, { resetForm }: { resetForm: () => void }) => {
        try {
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
        }
    };

    return (
        <div className={styles.container}>
            <HeaderSubText title="Set up account pin" description="Please use a pin you can remember easily" />
            <div className={styles.container__form_container} data-inmodal={inModal}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={styles.container__form_container__form}>
                                <div className={styles.form_field}>
                                    <Field
                                        name="accountPin"
                                        as={InputField}
                                        label="New account pin"
                                        placeholder="Enter 6 digit pin"
                                        isPassword
                                    />
                                    <ErrorMessage
                                        name="accountPin"
                                        component="div"
                                        className={styles.error_message}
                                    />
                                </div>
                                <div className={styles.form_field}>
                                    <Field
                                        name="confirmPin"
                                        as={InputField}
                                        label="Confirm pin"
                                        placeholder="Repeat pin"
                                        isPassword
                                    />
                                    <ErrorMessage
                                        name="confirmPin"
                                        component="div"
                                        className={styles.error_message}
                                    />
                                </div>
                            </div>
                            <div className={styles.submit_btn_container} data-inModal={inModal}>
                                <Button
                                    buttonType="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Saving...' : inModal ? "Save & proceed": 'Save changes'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AccountPinSet;
