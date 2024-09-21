"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./Payments.module.scss";
import { Button, Header, InputField, Select } from "@/shared";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { usePostUpdateBank } from "@/app/api/hooks/users";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { toast } from "react-toastify";
import { updateUser } from "@/store/slices/userSlice";
import { isEmpty } from "@/utils";

interface PayoutFormValues {
	accountName: string;
	accountNumber: string;
	bankName: string;
}

const Payments: React.FC = () => {
	const user = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();
	const { mutateAsync: postUpdateBank, isPending } = usePostUpdateBank();

	const initialValues: PayoutFormValues = {
		accountName: user.accountName || "",
		accountNumber: user.accountNumber || "",
		bankName: user.bankName || ""
	};
	const [formdata, setFormdata] = useState(initialValues);

	const validationSchema = Yup.object().shape({
		accountName: Yup.string().required("Account name is required"),
		bankName: Yup.string().required("Bank name is required"),
		accountNumber: Yup.string()
			.required("Account number is required")
			.matches(/^\d+$/, "Account number must be numeric")
	});

	const handleFormChange = (name: string, value: any) => {
		if (!name && !value) return;
		setFormdata(v => ({
			...v,
			[name]: value
		}));
	};

	const handleSubmit = async (values: PayoutFormValues) => {
		// Handle form submission
		try {
			const payload = { ...values, userId: user.userId };
			const res = await postUpdateBank(payload);
			if (res.data._id) {
				dispatch(
					updateUser({
						...res.data
					})
				);
                toast.success('Account details updated')
			}
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
	};
	const banksOptions = [
		"GTBank",
		"Access Bank",
		"Zenith Bank",
		"First Bank",
		"UBA",
		"FCMB",
		"Sterling Bank",
		"Union Bank",
		"Wema Bank",
		"Polaris Bank",
		"Keystone Bank"
	];

	return (
		<div className={styles.container}>
			<HeaderSubText
				title="Payout preferences"
				description="We need some information about you to be able to send you money"
			/>
			<div className={styles.container__form_container}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<div className={styles.container__form_container__form}>
								<div className={styles.form_field}>
									<Field name="accountName">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Account name"
												onChange={e => {
													handleFormChange(
														field.name,
														e.target.value
													);
													field.onChange(e);
												}}
												error={
													(touched.accountName &&
														errors.accountName) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.form_field}>
									<Field name="accountNumber">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Account number"
												onChange={e => {
													handleFormChange(
														field.name,
														e.target.value
													);
													field.onChange(e);
												}}
												error={
													(touched.accountNumber &&
														errors.accountNumber) ||
													""
												}
											/>
										)}
									</Field>
								</div>
                                <div className={styles.form_field}>
									<Field name="bankName">
										{({ field }: FieldProps) => (
											<Select
												{...field}
												label="Bank"
												options={banksOptions}
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
													(touched.bankName &&
														errors.bankName) ||
													""
												}
											/>
										)}
									</Field>
								</div>
							</div>
							<div className={styles.submit_btn_container}>
								<Button
									disabled={isSubmitting || isPending || !isEmpty(errors)}
									buttonType="primary"
									type="submit"
								>
									Save changes
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Payments;
