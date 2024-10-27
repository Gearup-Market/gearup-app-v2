import React from 'react'
import styles from "./ConfirmModal.module.scss"
import Modal from '@/shared/modals/modal/Modal'
import { Button } from '@/shared';
import Image from 'next/image';

interface Props {
    openModal: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal = ({ openModal, onClose, onConfirm }: Props) => {
    return (
        <Modal openModal={openModal} title="" setOpenModal={onClose}>
            <div className={styles.container}>
                <Image src="/svgs/confirm-icon.svg" alt="confirm" width={100} height={100} />
                <h2>Sure you want to grant this permission?</h2>
                <p>By confirming this action it means this user will have full control to this section of your dashboard. You can always decide to withdraw the permission anytime you want.</p>
                <Button onClick={onConfirm}>Confirm</Button>

            </div>
        </Modal>
    )
}

export default ConfirmModal