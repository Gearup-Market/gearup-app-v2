"use client";
import React from "react";
import styles from "./WalletWithdrawalModal.module.scss";
import Modal from "@/shared/modals/modal/Modal";
import Image from "next/image";
import { Button, InputField } from "@/shared";
import { EditIcon } from "@/shared/svgs/dashboard";
import { formatNum } from "@/utils";
import { useAppSelector } from "@/store/configureStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { iWallet } from "@/app/api/hooks/wallets/types";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import toast from "react-hot-toast";
import { usePostWithdraw } from "@/app/api/hooks/wallets";
import { useGetAllPricings } from "@/app/api/hooks/Admin/pricing";

interface Props {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	setConfirmWithdrawal: React.Dispatch<React.SetStateAction<boolean>>;
	wallet?: iWallet;
	refetch: () => void;
	walletBalance: number;
}

const validationSchema = Yup.object().shape({
	amount: Yup.number()
		.required("Amount is required")
		.moreThan(1000, "Amount must be at least 1000")
		.max(1000000, "Amount cannot exceed 1,000,000"),
	pin: Yup.number()
		.required("PIN is required")
		.min(6, "PIN must be at least 6 characters long")
});

interface PayoutFormValues {
	amount: number;
	pin: number | string;
}
const WalletWithrawalModal = ({
	openModal,
	setOpenModal,
	setConfirmWithdrawal,
	wallet,
	refetch,
	walletBalance
}: Props) => {
	const user = useAppSelector(state => state.user);
	const router = useRouter();
	const { mutateAsync: postWithdraw, isPending } = usePostWithdraw();
	const initialValues: PayoutFormValues = {
		amount: 0,
		pin: ""
	};
	const { data: allPricings } = useGetAllPricings();

	const isBankDetails = wallet?.bankName && wallet?.accountNumber;

	const handleSubmit = async (values: PayoutFormValues) => {
		const withdrawalFee = allPricings?.withdrawalFee || 0;
		if (values.amount > walletBalance) {
			toast.error("Amount is greater than available balance");
			return;
		}
		if (values.amount <= withdrawalFee) {
			toast.error("Amount must be greater than the withdrawal fee");
			return;
		}
		try {
			const payload = {
				amount: +values.amount - withdrawalFee,
				pin: +values.pin,
				userId: user.userId
			};
			const res = await postWithdraw(payload);
			toast.success("Withdraw request successful");
			setOpenModal(false);
		} catch (error: any) {
			toast.error(error.response.data.message);
		} finally {
			refetch();
		}
	};
	const onClose = () => {
		refetch();
		setOpenModal(false);
	};

	return (
		<Modal title="Withdrawal" openModal={openModal} setOpenModal={onClose}>
			<div className={styles.container}>
				<div className={styles.container__balance_container}>
					<p className={styles.title}>Available balance</p>
					<p className={styles.amount}>₦{formatNum(walletBalance)}</p>
					<p className={styles.title}>
						Withdrawal attracts a flat fee of ₦
						{formatNum(allPricings?.withdrawalFee || 0)}
					</p>
				</div>
				{isBankDetails ? (
					<>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({ touched, isSubmitting, errors }) => {
								return (
									<Form>
										<div
											className={
												styles.container__form_container__form
											}
										>
											<div className={styles.form_field}>
												<Field name="amount">
													{({ field, form }: FieldProps) => {
														const withdrawalFee =
															allPricings?.withdrawalFee ||
															0;
														const enteredAmount = Number(
															form.values.amount
														);
														const netAmount =
															enteredAmount >
																withdrawalFee &&
															enteredAmount >= 1000
																? enteredAmount -
																  withdrawalFee
																: 0;
														return (
															<>
																<InputField
																	{...field}
																	maxLength={7}
																	label="Amount"
																	type="number"
																	max={1000000}
																	onChange={e => {
																		field.onChange(e);
																	}}
																	error={
																		typeof form.errors
																			.amount ===
																			"string" &&
																		form.touched
																			.amount
																			? form.errors
																					.amount
																			: undefined
																	}
																/>
																{enteredAmount >
																	withdrawalFee && (
																	<p
																		className={
																			styles.title
																		}
																		style={{
																			marginTop: 4
																		}}
																	>
																		Net amount you
																		will receive: ₦
																		{formatNum(
																			netAmount
																		)}
																	</p>
																)}
															</>
														);
													}}
												</Field>
											</div>
											<div className={styles.form_field}>
												<Field name="pin">
													{({ field }: FieldProps) => (
														<InputField
															{...field}
															maxLength={10}
															label="PIN"
															type="number"
															isPassword
															onChange={e => {
																field.onChange(e);
															}}
															error={
																touched.pin && errors.pin
															}
														/>
													)}
												</Field>
											</div>
										</div>
										<div className={styles.container__bank_details}>
											<div className={styles.left}>
												<h2 className={styles.details_title}>
													Bank details
												</h2>
												<div
													className={styles.img_bank_container}
												>
													<div
														className={styles.bank_container}
													>
														<h3 className={styles.bank_name}>
															{wallet?.accountName}
														</h3>
													</div>
													<div
														className={styles.bank_container}
													>
														<h3 className={styles.bank_name}>
															{wallet?.bankName}
														</h3>
														<p className={styles.bank_number}>
															{wallet?.accountNumber}
														</p>
													</div>
												</div>
											</div>
											<Link
												href={"/user/settings?q=payments"}
												className={styles.right}
											>
												<span className={styles.icon}>
													<EditIcon />
												</span>
												Edit
											</Link>
										</div>
										{/* <div className={styles.submit_btn_container}> */}
										<Button
											disabled={
												isSubmitting ||
												isPending ||
												!isEmpty(errors)
											}
											buttonType="primary"
											type="submit"
											className={styles.button}
										>
											Withdraw
										</Button>
										{/* </div> */}
									</Form>
								);
							}}
						</Formik>
					</>
				) : (
					<>
						<div className={styles.container__bank_details}>
							<div className={styles.left}>
								<h2 className={styles.details_title}>No Bank details</h2>
							</div>
						</div>
						<Button onClick={() => router.push("/user/settings?q=payments")}>
							{isBankDetails ? "Withdraw" : "Add Bank Details"}
						</Button>
					</>
				)}
			</div>
		</Modal>
	);
};

export default WalletWithrawalModal;
