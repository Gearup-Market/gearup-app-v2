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
import { useGetWallet } from "@/app/api/hooks/wallets";
import ConfirmPin from "../confirmPin/ConfirmPin";

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

	const {
		data: walletResult,
		isFetching: isWalletFetching,
		refetch: refetchWallet
	} = useGetWallet({ userId: user.userId, isRefetch: false });

	const [formdata, setFormdata] = useState(initialValues);
	const [shouldFetch, setShouldFetch] = useState(false);
	const [errors, setErrors] = useState<any>({});
	const [openPinModal, setOpenPinModal] = useState<boolean>(false);
	const [pendingFormValues, setPendingFormValues] = useState<PayoutFormValues | null>(
		null
	);

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
		if (!user.kyc) {
			toast.error("please complete your kyc");
			return router.push("/verification");
		}
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
				bankCode: formdata.bankCode,
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
				refetchWallet();
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};

	const openModal = (values: PayoutFormValues) => {
		setPendingFormValues(values);
		setOpenPinModal(true);
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
					onSubmit={openModal}
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
													placeholder={
														walletResult?.data.accountNumber
															? walletResult?.data
																	.accountNumber
															: "No Account Connected yet"
													}
												/>
											)}
										</Field>
										{isFetching ? (
											<PageLoader />
										) : accountName?.data.accountName ? (
											accountName?.data.accountName
										) : (
											""
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
										{/* {isWalletFetching ? (
											<PageLoader />
										) : walletResult?.data.bankName ? (
											walletResult?.data.bankName
										) : (
											"No Account Connected yet"
										)} */}
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
				{walletResult?.data.bankName && (
					<div className={styles.container__bank_details}>
						<div className={styles.left}>
							<h2 className={styles.details_title}>Bank details</h2>
							<div className={styles.img_bank_container}>
								<div className={styles.bank_container}>
									<h3 className={styles.bank_name}>
										{walletResult?.data.accountName}
									</h3>
								</div>
								<div className={styles.bank_container}>
									<h3 className={styles.bank_name}>
										{walletResult?.data.bankName}
									</h3>
									<p className={styles.bank_number}>
										{walletResult?.data.accountNumber}
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			{openPinModal && (
				<ConfirmPin
					openModal={openPinModal}
					setOpenModal={setOpenPinModal}
					onSuccess={() => {
						if (pendingFormValues) {
							handleSubmit(pendingFormValues);
						}
					}}
					disabled={
						isPending || !isEmpty(errors) || !accountName?.data.accountName
					}
				/>
			)}
		</div>
	);
};

export default Payments;
