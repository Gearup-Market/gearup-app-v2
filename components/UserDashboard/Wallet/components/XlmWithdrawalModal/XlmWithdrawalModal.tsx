"use cient";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./XlmWithdrawalModal.module.scss";
import Modal from "@/shared/modals/modal/Modal";
import Image from "next/image";
import { Button, InputField } from "@/shared";
import { toast } from "react-hot-toast";
import { usePostTransferXLM } from "@/app/api/hooks/wallets";
import { useAppSelector } from "@/store/configureStore";
import * as Yup from "yup";
import { Field, FieldProps, Formik } from "formik";
import { calculateTotalCost } from "@/utils/stellar";

interface Props {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: () => void;
}

enum ModalType {
	SHOW_OPTIONS = "Show options",
	SHOW_TRANSFER_FORM = "Show transfer form",
	SHOW_BANK_DETAILS = "Show bank details",
	SHOW_XLM_CONFIRM_DETAILS = "Show transfer confirmation details"
}

type FundingOption = {
	id: number;
	title: string;
	description: string;
	icon: string;
};

const xlmFundOptions: FundingOption[] = [
	{
		id: 1,
		title: "Withdraw to bank account",
		description: "Withdraw XLM directly to your local bank account",
		icon: "/svgs/xlm-bank-deposit-icon.svg"
	},
	{
		id: 2,
		title: "External wallet",
		description: "Receive XLM  from another wallet",
		icon: "/svgs/xlm-wallet-deposit-icon.svg"
	}
];

type XlmTransferFormValues = {
	amount: number;
	address: string;
};

const WalletWithdrawalModalModal = ({ setOpenModal, openModal, refetch }: Props) => {
	const { userId } = useAppSelector(s => s.user);
	const [modalTitle, setModalTitle] = useState<string>("Choose withdrawal method");
	const [modalType, setModalType] = useState<string>(ModalType.SHOW_OPTIONS);
	const [backBtn, setBackBtn] = useState<boolean>(false);
	const { stellarWallet } = useAppSelector(s => s.wallet);

	const [formValues, setFormValues] = useState({
		amount: 0,
		recipientPublicKey: ""
	});

	const [transactionValue, setTransactionValue] = useState<{
		total: string;
		fee: string;
	}>({
		fee: "",
		total: ""
	});

	useEffect(() => {
		(async () => {
			const totalValue = await calculateTotalCost(
				formValues.amount.toString(),
				false
			);
			setTransactionValue(totalValue);
		})();
	}, [formValues.amount]);

	const initialValues: XlmTransferFormValues = {
		amount: 0,
		address: ""
	};

	const validationSchema = Yup.object().shape({
		amount: Yup.number().min(1).required("Amount is required"),
		address: Yup.string().required("Publickey or address of recipient is required")
	});

	const { mutateAsync: transferXLM, isPending } = usePostTransferXLM();

	const onClose = () => {
		setOpenModal(false);
	};

	const onOptionClick = (option: FundingOption) => {
		switch (option.id) {
			case 1:
				toast.success(
					"Ramping currently not supported. Please withdraw with the transfer option"
				);
				break;
			case 2:
				setModalTitle("Send XLM");
				setModalType(ModalType.SHOW_TRANSFER_FORM);
				break;
			default:
				toast.error("Select a withdrawal option");
		}
	};

	const handleClickBack = () => {
		setModalTitle("Send XLM");
		setModalType(ModalType.SHOW_TRANSFER_FORM);
		setBackBtn(false);
	};

	const onFormSubmit = () => {
		setModalTitle("Transfer");
		setModalType(ModalType.SHOW_XLM_CONFIRM_DETAILS);
		setBackBtn(true);
	};

	const handleConfirm = async () => {
		try {
			const res = await transferXLM({
				recipientPublicKey: formValues.recipientPublicKey,
				amount: formValues.amount.toString(),
				userId
			});
			if (res.data) {
				setOpenModal(false);
				setModalTitle("Choose withdrawal method");
				setModalType(ModalType.SHOW_OPTIONS);
				setBackBtn(false);
                refetch()
			}
		} catch (error: any) {
			toast.error(error?.message || "An error occured");
		}
	};

	return (
		<Modal
			addBackIcon={backBtn}
			onClickBack={handleClickBack}
			title={modalTitle}
			openModal={openModal}
			setOpenModal={onClose}
		>
			<div className={styles.container}>
				<hr className={styles.divider} />
				{modalType === ModalType.SHOW_OPTIONS && (
					<ul className={styles.container__bank_details}>
						{xlmFundOptions.map((option, index) => (
							<li
								key={index}
								className={styles.container__bank_details__option}
								onClick={() => onOptionClick(option)}
							>
								<div className={styles.left}>
									<span className={styles.icon}>
										<Image
											src={option.icon}
											alt="deposit icon"
											width={16}
											height={16}
										/>
									</span>
									<p>{option.title}</p>
								</div>
								<div className={styles.right}>
									<span className={styles.icon}>
										<Image
											src="/svgs/arrow-right.svg"
											alt="deposit icon"
											width={16}
											height={16}
										/>
									</span>
								</div>
							</li>
						))}
					</ul>
				)}
				{modalType === ModalType.SHOW_TRANSFER_FORM && (
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onFormSubmit}
					>
						{({ errors, touched, submitForm, isSubmitting }) => (
							<div className={styles.form_container}>
								<Field name="address">
									{({ field }: FieldProps) => (
										<InputField
											{...field}
											label="Address"
											placeholder="Enter wallet public key"
											className={styles.input}
											type="text"
											onChange={e => {
												field.onChange(e),
													setFormValues(f => ({
														...f,
														recipientPublicKey: e.target.value
													}));
											}}
											error={
												(touched.address && errors.address) || ""
											}
										/>
									)}
								</Field>
								<div>
									<Field name="amount">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Amount"
												placeholder="Enter amount in XLM"
												className={styles.input}
												type="number"
												min={0}
												onChange={e => {
													field.onChange(e);
													setFormValues(f => ({
														...f,
														amount: Number(e.target.value)
													}));
												}}
												suffix={
													stellarWallet?.xlmBalance && (
														<p
															className={styles.max_btn}
															onClick={() => {
																field.onChange({
																	target: {
																		name: "amount",
																		value: stellarWallet.xlmBalance
																	}
																});
															}}
														>
															Max
														</p>
													)
												}
												error={
													(touched.amount && errors.amount) ||
													""
												}
											/>
										)}
									</Field>
									{stellarWallet?.xlmBalance && (
										<p className={styles.total_amount}>
											= {stellarWallet.xlmBalance}
										</p>
									)}
								</div>
								<Button
									className={styles.submit_btn}
									onClick={submitForm}
								>
									Next
								</Button>
							</div>
						)}
					</Formik>
				)}
				{modalType === ModalType.SHOW_XLM_CONFIRM_DETAILS && (
					<div className={styles.bank_details_container}>
						<div className={styles.container__details}>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>Asset</p>
								<p className={styles.value}>XLM</p>
							</div>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>To</p>
								<p className={styles.value}>
									{formValues.recipientPublicKey}
								</p>
							</div>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>Network</p>
								<p className={styles.value}>Stellar</p>
							</div>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>Network fee</p>
								<p className={styles.value}>{transactionValue.fee}XLM</p>
							</div>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>Max total</p>
								<p className={styles.value}>{transactionValue.total}</p>
							</div>
							<Button className={styles.submit_btn} disabled={isPending} onClick={handleConfirm}>
								Confirm
							</Button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default WalletWithdrawalModalModal;
