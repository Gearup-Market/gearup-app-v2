"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./Payments.module.scss";
import { BankSelect, Button, Header, InputField, Select } from "@/shared";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { usePostUpdateBank } from "@/app/api/hooks/users";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { toast } from "react-hot-toast";
import { updateUser } from "@/store/slices/userSlice";
import { isEmpty } from "@/utils";
import { useGetAccountName } from "@/app/api/hooks/settings";
import { PageLoader } from "@/shared/loaders";
import { useRouter } from "next/navigation";

interface PayoutFormValues {
	accountName: string;
	accountNumber: string;
	bankName: string;
	bankCode: string;
}

const Payments: React.FC = () => {
	const user = useAppSelector(s => s.user);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const initialValues: PayoutFormValues = {
		accountName: user.accountName || "",
		accountNumber: user.accountNumber || "",
		bankName: user.bankName || "",
		bankCode: ""
	};
	const [formdata, setFormdata] = useState(initialValues);
	const [shouldFetch, setShouldFetch] = useState(false);
	const [errors, setErrors] = useState<any>({});

	const { data: accountName, isFetching } = useGetAccountName(
		shouldFetch ? formdata.accountNumber : undefined,
		formdata.bankCode
	);
	const { mutateAsync: postUpdateBank, isPending } = usePostUpdateBank();

	const validationSchema = Yup.object().shape({
		bankName: Yup.string().required("Bank is required"),
		bankCode: Yup.string().required("Bank is required"),
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

	useEffect(() => {
		if (formdata.accountNumber.length === 10) {
			setShouldFetch(true);
		} else {
			setShouldFetch(false);
		}
	}, [formdata.accountNumber]);

	const handleSubmit = async (values: PayoutFormValues) => {
		// if (!user.kyc) {
		// 	toast.error("please complete your kyc");
		// 	return router.push("/verification");
		// }
		const validateFormData = async (data: PayoutFormValues) => {
			try {
				await validationSchema?.validate(data, { abortEarly: false });
				return true;
			} catch (validationErrors: any) {
				const formattedErrors = validationErrors.inner.reduce(
					(acc: any, curr: any) => ({
						...acc,
						[curr.path]: curr.message
					}),
					{}
				);
				setErrors(formattedErrors);
				return false; // Validation failed
			}
		};
		setErrors({});
		const isValid = await validateFormData(formdata);
		if (!isValid) {
			return;
		}
		try {
			const payload = {
				accountName: accountName?.data.accountName as string,
				bankName: formdata.bankName,
				accountNumber: values.accountNumber,
				userId: user.userId
			};
			const res = await postUpdateBank(payload);
			if (res.data._id) {
				dispatch(
					updateUser({
						...res.data
					})
				);
				toast.success("Account details updated");
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className={styles.container}>
			<HeaderSubText
				title="Payout preferences"
				description="We need some information about you to be able to send you money"
			/>
			<div className={styles.container__form_container}>
				<Formik
					initialValues={initialValues}
					// validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ touched, isSubmitting }) => {
						return (
							<Form>
								<div className={styles.container__form_container__form}>
									<div className={styles.form_field}>
										<Field name="accountNumber">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													maxLength={10}
													label="Account number"
													onChange={e => {
														handleFormChange(
															field.name,
															e.target.value
														);
														field.onChange(e);
													}}
													error={errors.accountNumber}
												/>
											)}
										</Field>
										{isFetching ? (
											<PageLoader />
										) : (
											accountName?.data.accountName
										)}
									</div>
									<div className={styles.form_field}>
										<Field name="bankName">
											{({ field }: FieldProps) => (
												<BankSelect
													{...field}
													label="Bank"
													// options={banksOptions}
													defaultOption={
														field.value || "Select a bank"
													}
													onOptionChange={(
														name: any,
														value: any
													) => {
														handleFormChange(name, value);
														field.value = value;
														field.name = name;
													}}
													error={
														errors.bankName || errors.bankCode
													}
												/>
											)}
										</Field>
									</div>
								</div>
								<div className={styles.submit_btn_container}>
									<Button
										disabled={
											isSubmitting ||
											isPending ||
											!isEmpty(errors) ||
											!accountName?.data.accountName
										}
										buttonType="primary"
										type="submit"
									>
										Save changes
									</Button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default Payments;
