"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./PersonalInfo.module.scss";
import {
	Button,
	ImageUploader,
	InputField,
	LocationAutoComplete,
	Select,
	TextArea
} from "@/shared";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { Map } from "@/components/listing";
import { usePostUpdateUser } from "@/app/api/hooks/users";
import toast from "react-hot-toast";
import { updateUser } from "@/store/slices/userSlice";
import { Location } from "@/app/api/hooks/users/types";
import { useUploadFiles } from "@/app/api/hooks/listings";

interface PayoutFormValues {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phoneNumber: string;
	address: string;
	about: string;
}

const PersonalInfoForm: React.FC = () => {
	const user = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();
	const { mutateAsync: postUpdateUser, isPending } = usePostUpdateUser();
	const { mutateAsync: postUploadImage, isPending: uploadingImage } = useUploadFiles();
	const [location, setLocation] = React.useState<Location>();
	const [imageFile, setImageFile] = useState<File | null>(null);

	const initialValues: PayoutFormValues = {
		firstName: user.firstName || "",
		lastName: user.lastName || "",
		userName: user.userName,
		email: user.email,
		phoneNumber: user.phoneNumber || "",
		address: user.address || "",
		about: user.about || ""
	};

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("First name is required"),
		lastName: Yup.string().required("Last name is required"),
		userName: Yup.string().required("Display name is required"),
		phoneNumber: Yup.string().optional(),
		address: Yup.string().optional(),
		about: Yup.string().optional()
	});

	const handleSubmit = async (values: PayoutFormValues) => {
		if (imageFile) {
			const response = await postUploadImage([imageFile], {
				onSuccess: (value: any) => {
					handleUpdate({ ...values, avatar: value?.imageUrls[0] });
					setImageFile(null);
				},
				onError: () => {
					toast.error("An error occurred while updating your profile	");
				}
			});
		} else {
			handleUpdate(values);
		}
	};

	const handleUpdate = async (values: any) => {
		const resp = await postUpdateUser(
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
			<HeaderSubText
				title="Profile information"
				description="Please provide the necessary personal information"
			/>
			<div className={styles.container__form_container}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<div className={styles.uploader_container}>
								<ImageUploader
									onChange={file => setImageFile(file)}
									imageUrl={user.avatar}
								/>
								<h3 className={styles.name}>{user.userName}</h3>
								<p className={styles.email}>{user.email}</p>
							</div>
							<div className={styles.container__form_container__form}>
								<div className={styles.form_field}>
									<Field name="firstName">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="First name"
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
								<div className={styles.form_field}>
									<Field name="userName">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Display name"
												readOnly={true}
												error={
													(touched.userName &&
														errors.userName) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.phone_field}>
									<Field name="phoneNumber">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Phone number"
												customPrefix={
													<p
														className={
															styles.prefix_container
														}
													>
														+234{" "}
														<span
															className={
																styles.prefix_divider
															}
														></span>
													</p>
												}
												type="number"
												error={
													(touched.phoneNumber &&
														errors.phoneNumber) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.address_field}>
									<Field name="address">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Enter address"
												error={
													(touched.address && errors.address) ||
													""
												}
												value={location?.address}
												onChange={e => {
													field.onChange(e);
													setLocation({
														...location,
														address: e.target.value
													});
												}}
											/>
										)}
									</Field>
								</div>
								{/* <LocationAutoComplete /> */}
								<div className={styles.map_container}>
									<Map
										showTitle={false}
										location={location}
										setLocation={setLocation}
									/>
								</div>
								<div className={styles.text_area_container}>
									<Field name="about">
										{({ field }: FieldProps) => (
											<TextArea
												{...field}
												rows={6}
												className={styles.text_area}
												label="About"
												placeholder="Tell us about yourself..."
												error={
													(touched.about && errors.about) || ""
												}
											/>
										)}
									</Field>
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
