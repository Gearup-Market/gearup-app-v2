import React from 'react'
import styles from './PaymentForm.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { Form, Formik } from 'formik'
import { Button, InputField, Select } from '@/shared'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import countryList from 'react-select-country-list';
import { ArrowRight, CautionIcon, WarningIcon } from '@/shared/svgs/dashboard'
import { TransactionStage, TransactionStatus } from '@/interfaces'

interface Props {
    showPaymentForm: boolean
    setShowPaymentForm: React.Dispatch<React.SetStateAction<boolean>>
    handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
}

interface ShippingDetailsProps {
    cardNumber: string
    expires: string
    cvc: string
    country: string
}

const PaymentForm = ({ showPaymentForm, setShowPaymentForm, handleNext }: Props) => {
    const router = useRouter();

    const closeModal = () => {
        setShowPaymentForm(false)
    }

    const initialValues: ShippingDetailsProps = {
        cardNumber: '',
        expires: '',
        cvc: '',
        country: '',
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        bank: Yup.string(),
        accountNumber: Yup.string()
    });

    const handleSubmit = (values: ShippingDetailsProps) => {
        setShowPaymentForm(false)
        // handleNext(TransactionStage.AwaitingItemReturn)
    };

    const countries = countryList().getData()

    return (
        <Modal
            openModal={showPaymentForm} setOpenModal={closeModal} title="Review payment request"
        >
            <div className={styles.container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form >
                        <div className={styles.form}>
                            <div className={styles.form_field}>
                                <InputField label='Card number' placeholder='1234 1234 1234 1234' />
                            </div>
                            <div className={styles.grid_Styles}>
                                <div className={styles.form_field}>
                                    <InputField label='Expires' placeholder='MM/YY' />
                                </div>
                                <div className={styles.form_field}>
                                    <InputField label='CVC' placeholder='Enter CVC' />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <Select label='County' options={countries.map((item) => item.label)} />
                            </div>
                            <div className={styles.warning_container}>
                                <span className={styles.icon}>
                                    <WarningIcon color='#FFB30F' />
                                </span>
                                <p>By providing your card information, you allow www.gearup.com to charge your card for future payments in accordance with their terms.</p>
                            </div>
                        </div>
                        <div className={styles.submit_btn_container}>
                            <Button buttonType='primary' type="submit">Pay now <span className={styles.icon}><ArrowRight /></span></Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Modal>
    )
}

export default PaymentForm