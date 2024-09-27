"use client";

import React from "react";
import styles from "./ShippingAddress.module.scss";
import { Button, InputField, Select } from "@/shared";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { HeaderSubText } from "@/components/UserDashboard";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateCheckout } from "@/store/slices/checkoutSlice";

interface CheckoutFormValues {
	country: string;
	name: string;
	company: string;
	address: string;
	city: string;
	postalCode: string;
	phoneNumber: string;
}

interface Props {
	handleNext: (e?: any, skip?: boolean) => void;
	handlePrev: () => void;
}

const ShippingAddress = ({ handleNext, handlePrev }: Props) => {
	const saleProps = useAppSelector(s => s.checkout.saleProps);
	const dispatch = useAppDispatch();

	const initialValues: CheckoutFormValues = {
		name: saleProps.name,
		company: saleProps.company,
		address: saleProps.address,
		phoneNumber: saleProps.phoneNumber,
		city: saleProps.city,
		postalCode: saleProps.postalCode,
		country: saleProps.country
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		company: Yup.string().optional(),
		address: Yup.string().required("Address is required"),
		phoneNumber: Yup.string().required("Phone number is required"),
		city: Yup.string().required("City is required"),
		postalCode: Yup.string().required("Postal code is required"),
		country: Yup.string().required("Country is required")
	});

	const handleSubmit = (values: CheckoutFormValues, helpers: FormikHelpers<CheckoutFormValues>) => {
		helpers.setSubmitting(false)
		handleNext()
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(
			updateCheckout({
				saleProps: {
					...saleProps,
					[name]: value
				}
			})
		);
	};

	const countries = [
		"Nigeria",
		"Ghana",
		"South Africa",
		"Kenya",
		"Uganda",
		"Togo",
		"Benin"
	];

	return (
		<div className={styles.container}>
			<HeaderSubText variant="main" title="Checkout" />
			<div className={styles.container__form_container}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isSubmitting, submitForm }) => (
						<Form>
							<div className={styles.container__form_container__form}>
								<div className={styles.form_field}>
									<Field name="country">
										{({ field }: FieldProps) => {
											const selectedCountryIndex =
												countries.findIndex(
													c => c === field.value
												);
											return (
												<Select
													label="Country"
													options={countries}
													defaultOptionIndex={
														selectedCountryIndex !== -1
															? selectedCountryIndex
															: 0
													}
													onOptionChange={option => {
														const simulatedEvent = {
															preventDefault: () => {},
															target: {
																name: "country",
																value: option
															}
														} as React.ChangeEvent<HTMLInputElement>;
														field.onChange(simulatedEvent);
														handleOnChange(simulatedEvent);
													}}
													error={
														(touched.country &&
															errors.country) ||
														""
													}
												/>
											);
										}}
									</Field>
								</div>
								<div className={styles.form_field}>
									<Field name="name">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Name"
												placeholder="Enter full name"
												onChange={e => {
													field.onChange(e);
													handleOnChange(e);
												}}
												error={
													(touched.name && errors.name) || ""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.form_field}>
									<Field name="company">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Company(optional)"
												placeholder="Enter company name"
												onChange={e => {
													field.onChange(e);
													handleOnChange(e);
												}}
												error={
													(touched.company && errors.company) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.form_field}>
									<InputField
										label="VAT number(optional)"
										placeholder="Enter VAT number"
									/>
								</div>
								<div className={styles.form_field}>
									<Field name="address">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="address"
												placeholder="Enter shipping address"
												onChange={e => {
													field.onChange(e);
													handleOnChange(e);
												}}
												error={
													(touched.address && errors.address) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.flex_fields}>
									<div className={styles.form_field}>
										<Field name="postalCode">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Postal code"
													placeholder="Enter postal code"
													onChange={e => {
														field.onChange(e);
														handleOnChange(e);
													}}
													error={
														(touched.postalCode &&
															errors.postalCode) ||
														""
													}
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="city">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="city"
													placeholder="Enter city"
													onChange={e => {
														field.onChange(e);
														handleOnChange(e);
													}}
													error={
														(touched.city && errors.city) ||
														""
													}
												/>
											)}
										</Field>
									</div>
								</div>
								<div className={styles.form_field}>
									<Field name="phoneNumber">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Mobile number"
												placeholder="Enter phone number"
												onChange={e => {
													field.onChange(e);
													handleOnChange(e);
												}}
												error={
													(touched.phoneNumber &&
														errors.phoneNumber) ||
													""
												}
											/>
										)}
									</Field>
								</div>

								<div className={styles.submit_btn_container}>
									<Button
										disabled={isSubmitting}
										onClick={submitForm}
										iconSuffix="/svgs/arrow.svg"
									>
										Continue
									</Button>
									<Button
										buttonType="secondary"
										onClick={handlePrev}
										iconSuffix="/svgs/arrow.svg"
									>
										Back
									</Button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default ShippingAddress;
