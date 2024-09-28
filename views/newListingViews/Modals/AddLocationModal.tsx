import React from "react";
import styles from "./AddLocationModal.module.scss";
import Modal from "@/shared/modals/modal/Modal";
import { Button, InputField } from "@/shared";
import { Map } from "@/components/listing";

interface Props {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddLocationModal = ({ openModal, setOpenModal }: Props) => {

    const onClose   = () => {
        setOpenModal(false);
    }
	return (
		<Modal title="" openModal={openModal} setOpenModal={onClose}>
			<div className={styles.container}>
				<h2 className={styles.update_title}>Update profile location</h2>
				<InputField placeholder="Enter address" />
				<Map showTitle={false} showAddress={false}/>
                <div className={styles.btn_container}>
				<Button>Save changes</Button>
                </div>
			</div>
		</Modal>
	);
};

export default AddLocationModal;
