import { Button } from '@/shared'
import Modal from '@/shared/modals/modal/Modal'
import React from 'react'
import styles from './RefundModal.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TransactionStage } from '@/interfaces'

interface Props {
    handleNext: (stage: TransactionStage) => Promise<void>
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

enum Type {
    Proceed = 'Proceed',
    Back_To_Dashboard = 'Back to Dashboard',
}

const RefundModal = ({ handleNext, openModal, setOpenModal }: Props) => {
    const [mainText, setMainText] = React.useState<string>('By continuing, the refund will be credited to your Gearup wallet')
    const [subText, setSubText] = React.useState<string>('The money will be available for withdrawal in your wallet')
    const [type, setType] = React.useState<Type>(Type.Proceed)
    const router = useRouter()

    const onClose = () => {
        setOpenModal(false)
    }

    const onButtonClick = () => {
        if (type === Type.Proceed) {
            setMainText('Refund request  sent successfully')
            setSubText('TYou’ll be notified once your wallet has been credited')
            setType(Type.Back_To_Dashboard)
            handleNext(TransactionStage.BuyerRequestedRefund)
        } else {
            setMainText('By continuing, the refund will be credited to your Gearup wallet')
            setSubText('The money will be available for withdrawal in your wallet')
            setType(Type.Proceed)
            setOpenModal(false)
            router.push('/user/transactions')
        }
    }

    return (
        <Modal openModal={openModal} setOpenModal={onClose} title=''>
            <div className={styles.container}>
                <Image src={type === Type.Proceed ? "/svgs/warning_check_icon.svg" : "/svgs/success_check_icon.svg"} alt='Refund' height={50} width={50} />
                <h2 className={styles.container__main_text}>{mainText}</h2>
                <p className={styles.container__sub_text}>{subText}</p>
                <Button onClick={onButtonClick}>
                    {
                        type === Type.Proceed ? Type.Proceed : Type.Back_To_Dashboard
                    }
                </Button>
            </div>
        </Modal>
    )
}

export default RefundModal