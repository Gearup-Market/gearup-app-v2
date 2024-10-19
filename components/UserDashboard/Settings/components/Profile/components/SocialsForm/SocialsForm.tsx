import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './SocialsForm.module.scss';
import { Button, InputField } from '@/shared';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText';
import { usePostUpdateUser } from '@/app/api/hooks/users';
import { useAppDispatch, useAppSelector } from '@/store/configureStore';
import { updateUser } from '@/store/slices/userSlice';
import toast from 'react-hot-toast';

interface SocialFormValues {
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
}

const SocialForm: React.FC = () => {
    const { mutateAsync: postUpdateUser, isPending } = usePostUpdateUser();
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const initialValues: SocialFormValues = {
        linkedin: user.linkedin || '',
        facebook: user.facebook || '',
        instagram: user.instagram || '',
        twitter: user.twitter || '',
    };

    const validationSchema = Yup.object().shape({
        linkedin: Yup.string().url('Invalid URL format').optional(),
        facebook: Yup.string().url('Invalid URL format').optional(),
        instagram: Yup.string().url('Invalid URL format').optional(),
        twitter: Yup.string().url('Invalid URL format').optional(),
    });

    const handleSubmit = async (values: SocialFormValues) => {
        try {
            const resp = await postUpdateUser({ userId: user._id, ...values }, {
                onSuccess: (value) => {
                    dispatch(updateUser({ ...user, ...value }));
                    toast.success('Profile updated successfully');
                },
                onError: () => {
                    toast.error('An error occurred while updating your profile');
                },
            });
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <HeaderSubText title="Socials" description="Provide links to your social media pages" />
            <div className={styles.container__form_container}>
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
                                        name="linkedin"
                                        as={InputField}
                                        label="LinkedIn"
                                        placeholder="Enter LinkedIn URL"
                                    />
                                    <ErrorMessage name="linkedin" component="div" className={styles.error} />
                                </div>

                                <div className={styles.form_field}>
                                    <Field
                                        name="facebook"
                                        as={InputField}
                                        label="Facebook"
                                        placeholder="Enter Facebook URL"
                                    />
                                    <ErrorMessage name="facebook" component="div" className={styles.error} />
                                </div>

                                <div className={styles.form_field}>
                                    <Field
                                        name="instagram"
                                        as={InputField}
                                        label="Instagram"
                                        placeholder="Enter Instagram URL"
                                    />
                                    <ErrorMessage name="instagram" component="div" className={styles.error} />
                                </div>

                                <div className={styles.form_field}>
                                    <Field
                                        name="twitter"
                                        as={InputField}
                                        label="Twitter"
                                        placeholder="Enter Twitter URL"
                                    />
                                    <ErrorMessage name="twitter" component="div" className={styles.error} />
                                </div>
                            </div>

                            <div className={styles.submit_btn_container}>
                                <Button buttonType="primary" type="submit" disabled={isSubmitting}>
                                    {isPending ? 'Updating...' : 'Save changes'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SocialForm;
