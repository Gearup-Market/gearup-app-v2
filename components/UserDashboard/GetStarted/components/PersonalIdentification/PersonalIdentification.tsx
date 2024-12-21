"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Formik, Form, Field, FieldProps, FormikProps } from "formik";
import * as Yup from "yup";
import styles from "./PersonalIdentification.module.scss";
import { Button, InputField, Select, TextArea } from "@/shared";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import countryList from "react-select-country-list";
import RevealDetails from "../RevealDetails/RevealDetails";
import { iPostRegisterKycReq } from "@/app/api/hooks/users/types";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateVerification } from "@/store/slices/verificationSlice";
import { usePostRegisterKyc } from "@/app/api/hooks/users";
import { toast } from "react-hot-toast";
import { updateUser } from "@/store/slices/userSlice";

export type PersonalIdentificationFormValues = Omit<
	iPostRegisterKycReq,
	"userId" | "documentType" | "documentPhoto"
> & {
	birthDate: string;
	birthMonth: string;
	birthYear: string;
};

export interface PersonalIdentificationHandle {
	submitForm: () => void;
}

interface PersonalIdentificationProps {
	onSubmitSuccess: () => void;
}

const PersonalIdentification = forwardRef<
	PersonalIdentificationHandle,
	PersonalIdentificationProps
>(({ onSubmitSuccess }, ref) => {
	const formRef = useRef<FormikProps<PersonalIdentificationFormValues>>(null);
	const verificationState = useAppSelector(s => s.verification);
	const user = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();
	const { mutateAsync: postRegisterKyc } = usePostRegisterKyc();

	useImperativeHandle(ref, () => ({
		submitForm: () => {
			if (formRef.current) {
				formRef.current.submitForm();
			}
		}
	}));

	const initialValues: PersonalIdentificationFormValues = {
		firstName: verificationState.firstName,
		lastName: verificationState.lastName,
		bvn: verificationState.bvn,
		// phoneNumber: verificationState.phoneNumber,
		birthday: verificationState.birthday,
		country: verificationState.country,
		city: verificationState.city,
		postalCode: verificationState.postalCode,
		address: verificationState.address,
		birthDate: verificationState.birthDate,
		birthMonth: verificationState.birthMonth,
		birthYear: verificationState.birthYear
	};

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("First name is required"),
		lastName: Yup.string().required("Last name is required"),
		bvn: Yup.string().required("Bvn is required").length(11),
		birthDate: Yup.string().optional(),
		birthMonth: Yup.string().optional(),
		birthYear: Yup.string().optional(),
		country: Yup.string().optional(),
		city: Yup.string().required("City is required"),
		address: Yup.string().required("Address is required"),
		postalCode: Yup.string().required("Postal code is required")
	});

	const handleFormChange = (name: string, value: any) => {
		if (!name && !value) return;
		dispatch(
			updateVerification({
				[name]: value
			})
		);
	};

	const handleSubmit = async (values: PersonalIdentificationFormValues) => {
		// Handle form submission
		const { birthDate, birthMonth, birthYear, ...rest } = values;
		const monthIndex = monthsOptions.findIndex(m => m === birthMonth);
		const birthday = `${birthYear}-${monthIndex + 1}-${birthDate}`;
		rest.birthday = birthday;
		dispatch(updateVerification(rest));

		const payload = { ...rest, userId: user.userId! };

		try {
			dispatch(
				updateVerification({
					isLoading: true
				})
			);
			const res = await postRegisterKyc(payload);
			if (res?.data?._id) {
				dispatch(
					updateVerification({
						_id: res.data._id,
						isPhoneNumberVerified: !!res.data.isPhoneNumberVerified
					})
				);

				dispatch(
					updateUser({
						firstName: res.data.firstName || payload.firstName,
						lastName: res.data.lastName || payload.lastName,
						// phoneNumber: res.data.phoneNumber || payload.phoneNumber,
						address: res.data.address || payload.address
					})
				);
				// toast.success("Personal info saved")
			}
			onSubmitSuccess();
		} catch (error: any) {
			toast.error(error.response.data.message);
		} finally {
			dispatch(
				updateVerification({
					isLoading: false
				})
			);
		}
	};

	const monthsOptions = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	const yearsOptions = Array.from(new Array(100), (val, index) => `${2022 - index}`);
	const daysOptions = Array.from(new Array(31), (val, index) => `${index + 1}`);

	const countries = countryList().getData();

	return (
		<div className={styles.container}>
			<HeaderSubText
				title="Personal identification"
				description="Kindly note that we require you to input your information as it appears on your valid ID"
			/>
			<div className={styles.container__form_container}>
				<Formik
					innerRef={formRef}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<div className={styles.container__form_container__form}>
								<div className={styles.field}>
									<Field name="bvn">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="BVN"
												placeholder="Enter BVN"
												className={styles.input}
												onChange={e => {
													handleFormChange(
														field.name,
														e.target.value
													);
													field.onChange(e);
												}}
												error={(touched.bvn && errors.bvn) || ""}
											/>
										)}
									</Field>
								</div>
								<RevealDetails
									question="Why do we need your BVN?"
									answer="We need your BVN in order to verify your identity. Your BVN does not give us access to your bank accounts or transactions"
								/>
								<div className={styles.field}>
									<Field name="firstName">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="First name"
												placeholder="Enter first name"
												className={styles.input}
												onChange={e => {
													handleFormChange(
														field.name,
														e.target.value
													);
													field.onChange(e);
												}}
												error={
													(touched.firstName &&
														errors.firstName) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.field}>
									<Field name="lastName">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Last name"
												placeholder="Enter last name"
												className={styles.input}
												onChange={e => {
													handleFormChange(
														field.name,
														e.target.value
													);
													field.onChange(e);
												}}
												error={
													(touched.lastName &&
														errors.lastName) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.flex_fields}>
									<div className={styles.field}>
										<Field name="birthDate">
											{({ field }: FieldProps) => (
												<Select
													{...field}
													label="Birth Date"
													options={daysOptions}
													defaultOption={field.value}
													onOptionChange={option => {
														handleFormChange(
															field.name,
															option
														);
														field.onChange({
															target: {
																name: field.name,
																value: option
															}
														});
													}}
													error={
														(touched.birthDate &&
															errors.birthDate) ||
														""
													}
												/>
											)}
										</Field>
									</div>
									<div className={styles.field}>
										<Field name="birthMonth">
											{({ field }: FieldProps) => (
												<Select
													label="Birth Month"
													options={monthsOptions}
													defaultOption={field.value}
													onOptionChange={option => {
														handleFormChange(
															field.name,
															option
														);
														field.onChange({
															target: {
																name: field.name,
																value: option
															}
														});
													}}
													error={
														(touched.birthMonth &&
															errors.birthMonth) ||
														""
													}
												/>
											)}
										</Field>
									</div>
									<div className={styles.field}>
										<Field name="birthYear">
											{({ field }: FieldProps) => (
												<Select
													label="Birth Year"
													options={yearsOptions}
													defaultOption={field.value}
													onOptionChange={option => {
														handleFormChange(
															field.name,
															option
														);
														field.onChange({
															target: {
																name: field.name,
																value: option
															}
														});
													}}
													error={
														(touched.birthYear &&
															errors.birthYear) ||
														""
													}
												/>
											)}
										</Field>
									</div>
								</div>
								<div className={styles.field}>
									<Field name="country">
										{({ field }: FieldProps) => (
											<Select
												label="Country"
												options={countries.map(
													item => item.label
												)}
												defaultOption={field.value}
												onOptionChange={option => {
													handleFormChange(field.name, option);
													field.onChange({
														target: {
															name: field.name,
															value: option
														}
													});
												}}
												error={
													(touched.country && errors.country) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.field}>
									<Field name="address">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Address"
												placeholder="Enter address"
												className={styles.input}
												onChange={e =>
													handleFormChange(
														field.name,
														e.target.value
													)
												}
												error={
													(touched.address && errors.address) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.flex_fields}>
									<div className={styles.field}>
										<Field name="postalCode">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Postal code"
													placeholder="Enter postal code"
													className={styles.input}
													onChange={e =>
														handleFormChange(
															field.name,
															e.target.value
														)
													}
													error={
														(touched.postalCode &&
															errors.postalCode) ||
														""
													}
												/>
											)}
										</Field>
									</div>
									<div className={styles.field}>
										<Field name="city">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="City"
													placeholder="Enter city"
													className={styles.input}
													onChange={e =>
														handleFormChange(
															field.name,
															e.target.value
														)
													}
													error={
														(touched.city && errors.city) ||
														""
													}
												/>
											)}
										</Field>
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
});

PersonalIdentification.displayName = "PersonalIdentification";

export default PersonalIdentification;
