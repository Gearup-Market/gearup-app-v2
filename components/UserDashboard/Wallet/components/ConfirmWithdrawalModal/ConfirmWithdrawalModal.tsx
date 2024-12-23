"use cient";
import React from "react";
import styles from "./ConfirmWithdrawalModal.module.scss";
import Modal from "@/shared/modals/modal/Modal";
import { Button, InputField } from "@/shared";
import { iWallet } from "@/app/api/hooks/wallets/types";

interface Props {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
	wallet?: iWallet;
	refetch: () => void;
}

const ConfirmWithdrawalModal = ({
	openModal,
	setOpenModal,
	setShowAlertModal,
	wallet,
	refetch
}: Props) => {
	const handleSubmit = () => {
		setShowAlertModal(true);
		setOpenModal(false);
	};

	return (
		<Modal
			title="Confirm withdrawal"
			openModal={openModal}
			setOpenModal={setOpenModal}
		>
			<div className={styles.container}>
				<hr />
				<div className={styles.border_container}>
					<p className={styles.sub_text}>
						A code has been sent to your Einstein***@gmail.com
					</p>
					<InputField placeholder="Enter verification code " />
				</div>
				<Button onClick={handleSubmit}>Withdraw</Button>
			</div>
		</Modal>
	);
};

export default ConfirmWithdrawalModal;
