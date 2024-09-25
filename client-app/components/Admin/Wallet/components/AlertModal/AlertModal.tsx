'use cient';
import React from 'react'
import styles from './AlertModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { Button, InputField } from '@/shared';
import { SuccessCheck } from '@/shared/svgs/dashboard';
import Link from 'next/link';

interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertModal = ({ openModal, setOpenModal }: Props) => {



    return (
        <Modal title='' openModal={openModal} setOpenModal={setOpenModal} >
            <div className={styles.container}>
                <span className={styles.icon}>
                    <SuccessCheck />
                </span>
                <div className={styles.border_container}>
                    <h2 className={styles.title}>Withdrawal Request Successful</h2>
                    <p className={styles.sub_text}>Your withdrawals will be processed within the next 48 hours</p>
                </div>
                <div className={styles.btn_container}>
                    <Button onClick={() => setOpenModal(false)} className={styles.button}>
                        <Link href='/admin/wallet'>
                            Go back to dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default AlertModal