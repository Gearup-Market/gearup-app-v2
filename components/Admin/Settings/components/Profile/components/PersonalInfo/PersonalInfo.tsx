// components/PayoutForm.tsx
"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./PersonalInfo.module.scss";
import { Button, ImageUploader, InputField } from "@/shared";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { useUploadFiles } from "@/app/api/hooks/listings";
import toast from "react-hot-toast";
import { updateUser } from "@/store/slices/userSlice";
import { usePostUpdateAdmin } from "@/app/api/hooks/Admin/users";

interface AdminUser {
	firstName: string;
	lastName: string;
	email: string;
}
const validationSchema = Yup.object().shape({
	firstName: Yup.string(),
	lastName: Yup.string(),
	email: Yup.string()
});

const PersonalInfoForm: React.FC = () => {
	const user = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();
	const { mutateAsync: postUploadImage, isPending: uploadingImage } = useUploadFiles();
	const { mutateAsync: postUpdateAdmin, isPending } = usePostUpdateAdmin();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const initialValues: AdminUser = {
		firstName: "",
		lastName: "",
		email: ""
	};

	const handleSubmit = async (values: AdminUser) => {
		const updatedFields = Object.entries(values).reduce((acc, [key, value]) => {
			const fieldKey = key as keyof AdminUser;
			if (value !== initialValues[fieldKey]) {
				acc[fieldKey] = value;
			}
			return acc;
		}, {} as Partial<AdminUser>);

		// Skip API call if no fields were updated
		if (Object.keys(updatedFields).length === 0 && !imageFile) {
			toast("No changes made");
			return;
		}
		if (imageFile) {
			const response = await postUploadImage([imageFile], {
				onSuccess: (value: any) => {
					handleUpdate({ ...updatedFields, avatar: value?.imageUrls[0] });
					setImageFile(null);
				},
				onError: () => {
					toast.error("An error occurred while updating your profile	");
				}
			});
		} else {
			handleUpdate(updatedFields);
		}
	};

	const handleUpdate = async (values: any) => {
		const resp = await postUpdateAdmin(
			{ userId: user._id, ...values },
			{
				onSuccess: value => {
					dispatch(updateUser({ ...user, ...value }));
					toast.success("Profile updated successfully");
				},
				onError: () => {
					toast.error("An error occurred while updating your profile	");
				}
			}
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__form_container}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<div className={styles.header_title}>
								<HeaderSubText title="My profile" variant="main" />
							</div>
							<div className={styles.uploader_container}>
								<ImageUploader
									onChange={file => setImageFile(file)}
									imageUrl={user.avatar}
								/>
								<div>
									<h3 className={styles.name}>
										{user.firstName || user.lastName
											? `${user.firstName} ${user.lastName}`
											: user.email}
									</h3>
									<p className={styles.email}>
										{user.role?.roleName as string}
									</p>
								</div>
							</div>
							<div className={styles.container__form_container__form}>
								<div className={styles.form_field}>
									<Field name="firstName">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="First name"
												placeholder={
													user.firstName || "Enter first name"
												}
												error={
													(touched.firstName &&
														errors.firstName) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.form_field}>
									<Field name="lastName">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Last name"
												error={
													(touched.lastName &&
														errors.lastName) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.address_field}>
									<Field name="email">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Email"
												placeholder={
													user.email || "enter address"
												}
												error={
													(touched.email && errors.email) || ""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.address_field}>
									{/* <Field name="role">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="My role"
												placeholder="enter address"
												value={user.role.roleName}
												inputClassName={styles.disabled_field}
											/>
										)}
									</Field> */}
									<InputField
										label="My role"
										placeholder="enter address"
										value={user.role.roleName}
										disabled
										inputClassName={styles.disabled_field}
									/>
								</div>
							</div>
							<div className={styles.submit_btn_container}>
								<Button buttonType="primary" type="submit">
									{isPending || uploadingImage
										? "Updating..."
										: "Save changes"}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default PersonalInfoForm;
