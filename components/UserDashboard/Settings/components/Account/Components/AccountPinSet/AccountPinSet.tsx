import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AccountPinSet.module.scss';
import { Button, InputField } from '@/shared';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText';
import { useAppDispatch, useAppSelector } from '@/store/configureStore';
import { usePostUpdateUser, usePostUpdateUserPin } from '@/app/api/hooks/users';
import toast from 'react-hot-toast';
import { useConfirmTransactionPin } from '@/app/api/hooks/settings';
import { useAuth } from '@/contexts/AuthContext';
import { updateUser } from '@/store/slices/userSlice';

interface PinFormValues {
    currentPin?: string;
    accountPin: string;
    confirmPin: string;
}

interface Props {
    inModal?: boolean;
    onClose?: () => void;
}

const AccountPinSet: React.FC<Props> = ({ inModal = false, onClose }) => {
    const user = useAppSelector(state => state.user);
    const { mutateAsync: confirmPin, isPending: confirmingPin } = useConfirmTransactionPin()
    const { mutateAsync: postUpdateUserPin, isPending } = usePostUpdateUserPin();
    const dispatch = useAppDispatch()

    const initialValues: PinFormValues = {
        accountPin: '',
        confirmPin: '',
        currentPin: '',
    };

    const validationSchema = Yup.object().shape({
        accountPin: Yup.string()
            .required('New account pin is required')
            .matches(/^\d{6}$/, 'Pin must be exactly 6 digits'),
        confirmPin: Yup.string()
            .oneOf([Yup.ref('accountPin')], 'Pins do not match')
            .required('Please confirm your pin'),
        currentPin: !!user.hasPin ? Yup.string().required('Current pin is required') : Yup.string().optional(),
    });

    const handleSubmit = async (values: PinFormValues, { resetForm }: { resetForm: () => void }) => {
        if (!!user.hasPin && !!values.currentPin) {
           await confirmPin({ userId: user._id as string, pin: parseInt(values.currentPin) }, {
                onSuccess: (value) => {
                    resetForm()
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message ?? "Could not confirm transaction pin, try again later!!!");
                    return;
                },
            })
        }
        try {
             await postUpdateUserPin({ userId: user._id, pin: values.accountPin }, {
                 onSuccess: (value:any) => {
                    toast.success('Pin updated successfully');
                    dispatch(updateUser(value?.userModel))
                    resetForm()
                },
                onError: () => {
                    toast.error('An error occurred while updating your account pin');
                },
            });
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            if (onClose) {
                onClose()
            }

        }
    };

    return (
        <div className={styles.container}>
            <HeaderSubText title="Transaction pin" description="Please use a pin you can remember easily" />
            <div className={styles.container__form_container} data-inmodal={inModal}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={styles.container__form_container__form}>
                                {
                                    !!user.hasPin &&
                                    <div className={styles.form_field}>
                                        <Field
                                            name="currentPin"
                                            as={InputField}
                                            label="Current account pin"
                                            placeholder="Enter current pin"
                                            isPassword
                                        />
                                        <ErrorMessage
                                            name="currentPin"
                                            component="div"
                                            className={styles.error_message}
                                        />
                                    </div>
                                }
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
                                    {isSubmitting ? 'Saving...' : inModal ? "Save & proceed" : 'Save changes'}
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
