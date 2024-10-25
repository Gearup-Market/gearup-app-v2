import React from 'react';
import styles from './AddCategory.module.scss';
import Modal from '@/shared/modals/modal/Modal';
import { Button, InputField } from '@/shared';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePostCreateBlogCategory } from '@/app/api/hooks/blogs';
import toast from 'react-hot-toast';

interface AddMemberProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    category?: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    refetch?: () => void;
}

const AddCategory = ({ openModal, setOpenModal, category, setCategory, refetch }: AddMemberProps) => {
    const { mutateAsync: createBlogCategory, isPending } = usePostCreateBlogCategory();

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
        await createBlogCategory(
            { name: values.category, tag: values.category },
            {
                onSuccess: (value) => {
                    setCategory(value.data.name);
                    setOpenModal(false);
                    toast.success("Category created successfully");
                    refetch && refetch();
                },
                onError: (err) => {
                    console.log(err);
                    toast.error("Error creating category");
                },
            }
        );
    };

    const onClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal openModal={openModal} setOpenModal={onClose} title='Create new category'>
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
                                        {isPending ? "Creating Category..." : "Create Category"}
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

export default AddCategory;
