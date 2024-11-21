import React from "react";
import styles from "./AddMember.module.scss";
import Modal from "@/shared/modals/modal/Modal";
import { Button, InputField, Select } from "@/shared";
import { Form, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { usePostCreateAdminMember } from "@/app/api/hooks/settings";
import { CircularProgressLoader } from "@/shared/loaders";
import toast from "react-hot-toast";
import { useGetAdminRoles } from "@/app/api/hooks/Admin/users";

interface AddMemberProps {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMember = ({ openModal, setOpenModal }: AddMemberProps) => {
	const { mutateAsync: createAdmin, isPending } = usePostCreateAdminMember();
	const { data, isLoading } = useGetAdminRoles();
	const roleOptions = data?.map(item => item.roleName);

	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "",
		userName: ""
	};

	const validationSchema = Yup.object({
		firstName: Yup.string().required("First name is required"),
		lastName: Yup.string().required("Last name is required"),
		userName: Yup.string().required("Username is required"),
		email: Yup.string().email("Invalid email format").required("Email is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password")], "Passwords must match")
			.required("Confirm password is required"),
		role: Yup.string().required("Role is required")
	});

	const handleSubmit = async (values: typeof initialValues) => {
		const getRoleId = data?.find(item => item.roleName === values.role);
		if (!getRoleId) return toast.error("Role not found");
		try {
			await createAdmin({
				email: values.email,
				firstName: values.firstName,
				lastName: values.lastName,
				password: values.password,
				userName: values.userName,
				role: getRoleId?._id as string
			});
			setOpenModal(false);
			toast.success("Admin created successfully");
		} catch (error) {
			toast.error("Error creating admin");
		}
	};

	const onClose = () => {
		setOpenModal(false);
	};

	return (
		<Modal
			openModal={openModal}
			setOpenModal={onClose}
			title="Add Member"
			description="Add your member that will be given access to the Gearup portal"
		>
			<div className={styles.container}>
				<div className={styles.container__form_container}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ setFieldValue }) => (
							<Form>
								<div className={styles.container__form_container__form}>
									<div className={styles.form_field}>
										<Field
											name="firstName"
											as={InputField}
											label="First Name"
											placeholder="Enter first name"
										/>
										<ErrorMessage
											name="firstName"
											component="div"
											className={styles.error}
										/>
									</div>
									<div className={styles.form_field}>
										<Field
											name="lastName"
											as={InputField}
											label="Last Name"
											placeholder="Enter last name"
										/>
										<ErrorMessage
											name="lastName"
											component="div"
											className={styles.error}
										/>
									</div>
									<div className={styles.form_field}>
										<Field
											name="userName"
											as={InputField}
											label="Username"
											placeholder="Enter username"
										/>
										<ErrorMessage
											name="userName"
											component="div"
											className={styles.error}
										/>
									</div>
									<div className={styles.form_field}>
										<Field
											name="email"
											as={InputField}
											label="Email"
											placeholder="Enter email address"
										/>
										<ErrorMessage
											name="email"
											component="div"
											className={styles.error}
										/>
									</div>
									<div className={styles.form_field}>
										<Select
											label="Role"
											options={roleOptions}
											onOptionChange={option =>
												setFieldValue("role", option)
											}
										/>
										<ErrorMessage
											name="role"
											component="div"
											className={styles.error}
										/>
									</div>
									<div className={styles.form_field}>
										<Field
											name="password"
											as={InputField}
											isPassword={true}
											type="password"
											label="Password"
											placeholder="Password (Min. of 8 characters)"
										/>
										<ErrorMessage
											name="password"
											component="div"
											className={styles.error}
										/>
									</div>
									<div className={styles.form_field}>
										<Field
											name="confirmPassword"
											as={InputField}
											isPassword={true}
											type="password"
											label="Confirm Password"
											placeholder="Repeat password"
										/>
										<ErrorMessage
											name="confirmPassword"
											component="div"
											className={styles.error}
										/>
									</div>
								</div>
								<div className={styles.submit_btn_container}>
									<Button buttonType="primary" type="submit">
										{isPending ? (
											<CircularProgressLoader
												size={20}
												color="white"
											/>
										) : (
											"Add Member"
										)}
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

export default AddMember;
