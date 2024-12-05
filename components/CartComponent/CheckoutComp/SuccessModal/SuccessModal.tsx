import Modal from "@/shared/modals/modal/Modal";
import { SuccessCheck } from "@/shared/svgs/dashboard";
import React from "react";
import styles from "./SuccessModal.module.scss";
import { Button } from "@/shared";
import Link from "next/link";

interface Props {
	openModal: boolean;
	setOpenModal: (value: boolean) => void;
}
const SuccessModal = ({ openModal, setOpenModal }: Props) => {
	const handleClose = () => {
		setOpenModal(false);
	};
	return (
		<Modal title="" openModal={openModal} setOpenModal={handleClose}>
			<div className={styles.container}>
				<span className={styles.icon}>
					<SuccessCheck />
				</span>
				<div className={styles.border_container}>
					<h2 className={styles.title}>Payment successful</h2>
					<p className={styles.sub_text}>
						Yay! 🥳 your payment was successful and your request has been
						submitted
					</p>
				</div>
				<div className={styles.btn_container}>
					<Button onClick={() => setOpenModal(false)} className={styles.button}>
						<Link href="/user/wallet">Go back to dashboard</Link>
					</Button>
					<Button onClick={() => setOpenModal(false)} className={styles.button}>
						<Link href="/listings?type=rent">Place another order</Link>
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default SuccessModal;
