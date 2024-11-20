import React from 'react';
import styles from './AddRole.module.scss';
import Modal from '@/shared/modals/modal/Modal';
import { Button, InputField, Select } from '@/shared';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePostCreateAdminRoles } from '@/app/api/hooks/Admin/users';
import toast from 'react-hot-toast';

interface AddMemberProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRole = ({ openModal, setOpenModal }: AddMemberProps) => {
    const [selectedRole, setSelectedRole] = React.useState<string>('');
    const {mutateAsync: postCreateRole, isPending} = usePostCreateAdminRoles()

    interface RoleFormValues {
        roleName: string;
    }

    const initialValues: RoleFormValues = {
        roleName: '',
    };

    const validationSchema = Yup.object().shape({
        roleName: Yup.string().required('Role name is required'),
    });

    const handleSubmit = async(values: RoleFormValues) => {
        // You can also call an API to create the role here
        await postCreateRole(values,{
            onSuccess: () => {
                toast.success('Role created successfully');
                setOpenModal(false);
            },
            onError: (err) => {
                toast.error('Error creating role');
            }
        })

    };

    const onClose = () => {
        setOpenModal(false);
    };

    const roleOptions = [
        { value: 'customer support', label: 'Customer Support' },
        { value: 'designer', label: 'Designer' },
        { value: 'footballer', label: 'Footballer' },
    ];

    const onOptionChange = (option: any) => {
        setSelectedRole(option.value);
    };

    return (
        <Modal openModal={openModal} setOpenModal={onClose} title='Create new role' description='Add roles to your Gearup portal'>
            <div className={styles.container}>
                <div className={styles.container__form_container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur }) => (
                            <Form>
                                <div className={styles.container__form_container__form}>
                                    <div className={styles.address_field}>
                                        <Field 
                                            name='roleName'
                                            render={({ field }: any) => (
                                                <InputField
                                                    {...field}
                                                    label='Role Name'
                                                    placeholder='Enter role name'
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setSelectedRole(e.target.value); // Update selectedRole
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                            )}
                                        />
                                        <ErrorMessage name="roleName" component="div" className={styles.error} />
                                    </div>
                                </div>
                                <div className={styles.submit_btn_container}>
                                    <Button buttonType='primary' type="submit">Create Role</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Modal>
    );
}

export default AddRole;
