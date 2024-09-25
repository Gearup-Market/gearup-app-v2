'use cient';
import React from 'react'
import styles from './WithdrawalModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import Image from 'next/image';
import { Button, InputField } from '@/shared';
import { EditIcon } from '@/shared/svgs/dashboard';


interface Props {
    isWithdrawal: boolean;
    setIsWithdrawal: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmWithdrawal: React.Dispatch<React.SetStateAction<boolean>>;

}
const WithrawalModal = ({ isWithdrawal, setIsWithdrawal, setConfirmWithdrawal }: Props) => {

    const handleSubmit = () => {
        setConfirmWithdrawal(true)
        setIsWithdrawal(false)
    }



    return (
        <Modal title='Withdrawal' openModal={isWithdrawal} setOpenModal={setIsWithdrawal} >
            <div className={styles.container}>
                <div className={styles.container__balance_container}>
                    <p className={styles.title}>Available balance</p>
                    <p className={styles.amount}>#200,000</p>
                </div>
                <InputField placeholder='Enter amount' />
                <div className={styles.container__bank_details}>
                    <div className={styles.left}>
                        <h2 className={styles.details_title}>Bank details</h2>
                        <div className={styles.img_bank_container}>
                            <Image src='data:image/png;base64,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' width={30} height={30} alt='bank icon' />
                            <div className={styles.bank_container}>
                                <h3 className={styles.bank_name}>Zenith bank</h3>
                                <p className={styles.bank_number}>2233521442</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <span className={styles.icon}>
                            <EditIcon />
                        </span>
                        Edit
                    </div>
                </div>
                <Button onClick={handleSubmit}>
                    Withdraw
                </Button>
            </div>
        </Modal>

    )
}

export default WithrawalModal