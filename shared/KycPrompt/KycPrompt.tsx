import React from "react";
import styles from "./KycPrompt.module.scss";
import Modal from "../modals/modal/Modal";
import Button from "../button/Button";
import Image from "next/image";
import Link from "next/link";

interface Props {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const KycPrompt = ({ openModal, setOpenModal }: Props) => {
	const onClose = () => {
		setOpenModal(false);
	};

	return (
		<Modal title="" openModal={openModal} setOpenModal={onClose}>
			<div className={styles.container}>
				<Image src="/svgs/kyc-prompt.svg" alt="" height={80} width={80} />
				<div className={styles.texts_container}>
					<h2>Complete your KYC To Get Started</h2>
					<p>
						We want to keep our community safe, you’ll need to complete the
						verification process to rent or rent out{" "}
					</p>
				</div>
				<Button onClick={onClose}>
					<Link href="/verification">Get Started</Link>
				</Button>
			</div>
		</Modal>
	);
};

export default KycPrompt;
