import React from 'react';
import styles from './EditCategory.module.scss';
import Modal from '@/shared/modals/modal/Modal';
import { Button, InputField } from '@/shared';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePostUpdateBlogCategory } from '@/app/api/hooks/blogs';
import toast from 'react-hot-toast';

interface AddMemberProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    categoryId?: string;
    refetch?: () => void;
}

const AddRole = ({ openModal, setOpenModal, refetch, categoryId }: AddMemberProps) => {
    const { mutateAsync: updateBlogCategory, isPending } = usePostUpdateBlogCategory();

    interface AddCategoryFormValues {
        category: string;
    }

    const initialValues: AddCategoryFormValues = {
        category: "",
    };

    const validationSchema = Yup.object().shape({
        category: Yup.string().required('Category name is required'),
    });

    const handleSubmit = async (values: AddCategoryFormValues) => {
        if(!categoryId) return;
        await updateBlogCategory(
            {id: categoryId as string, name: values.category, tag: values.category, _id: categoryId},
            {
                onSuccess: (value) => {
                    setOpenModal(false);
                    toast.success("Category updated successfully");
                    refetch && refetch();
                },
                onError: (err) => {
                    toast.error("Error updating category");
                },
            }
        );
    };

    const onClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal openModal={openModal} setOpenModal={onClose} title='Edit category'>
            <div className={styles.container}>
                <div className={styles.container__form_container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className={styles.container__form_container__form}>
                                    <div className={styles.address_field}>
                                        <Field name="category">
                                            {({ field }: any) => (
                                                <InputField
                                                    label='Category Name'
                                                    placeholder='Enter category name'
                                                    {...field}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="category" component="div" className={styles.error_text} />
                                    </div>
                                </div>
                                <div className={styles.submit_btn_container}>
                                    <Button buttonType='primary' type="submit">
                                        {isPending ? "Updating..." : "Save changes"}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddRole;
