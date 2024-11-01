'use client'
import React, { useState } from 'react'
import styles from './ExportWallet.module.scss'
import { HeaderSubText } from '@/components/Admin'
import Image from 'next/image'
import { WarningIcon } from '@/shared/svgs/dashboard'
import { EnterTransactionPin, XlmExportModal, SetTransactionPinModal } from './components'

enum ModalType {
    SHOW_SECRET_PHRASE = 'Show secret phrase',
    SHOW_GOOGLE_BACKUP = 'Show google backup'
}


const importOptions = [
    {
        id: 1,
        name: 'Export Your XLM Wallet ',
        description: 'Securely export your wallet’s private key or recovery phrase.',
        icon: '/svgs/export-wallet-icon.svg',
        modalType: ModalType.SHOW_SECRET_PHRASE
    },
]

const ImportWallet = () => {
    const hasTransactionPinSet = false;
    const [showTransactionPinModal, setShowTransactionPinModal] = useState(false);
    const [showSetTransactionPinModal, setShowSetTransactionPinModal] = useState(false);
    const [showXlmExportModal, setShowXlmExportModal] = useState(false);

    const handleOpenModal = (modalType: string) => {
        // setShowTransactionPinModal(true);
        setShowXlmExportModal(true);
    }

    return (
        <div className={styles.container}>
            <HeaderSubText title="Export wallet" description="Transfer your current wallet and manage your funds seamlessly" />

            <div className={styles.content_body}>
                <ul>
                    {
                        importOptions.map((option, index) => (
                            <li key={index} className={styles.option} onClick={() => handleOpenModal(option.modalType)}>
                                <div className={styles.option__left}>
                                    <span className={styles.icon}>
                                        <Image src={option.icon} alt='deposit icon' height={20} width={20} />
                                    </span>
                                    <div className={styles.option_left__right}>
                                        <p className={styles.name}>{option.name}</p>
                                        <p className={styles.description}>{option.description}</p>
                                    </div>
                                </div>
                                <div className={styles.option__right}>
                                    <span className={styles.icon}>
                                        <Image src='/svgs/arrow-right.svg' alt='deposit icon' height={20} width={20} />
                                    </span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className={styles.warning_container}>
                    <span className={styles.icon}>
                        <WarningIcon color='#A26B00' />
                    </span>
                    <p>Exporting your wallet will reveal sensitive information. Ensure it is stored securely, as anyone with this data <br /> can access your funds. Proceed with caution.</p>
                </div>
            </div>

           <XlmExportModal openModal={showXlmExportModal} setOpenModal={setShowXlmExportModal} />
            
          <SetTransactionPinModal openModal={showSetTransactionPinModal} setOpenModal={setShowSetTransactionPinModal} />
            <EnterTransactionPin openModal={showTransactionPinModal} setOpenModal={setShowTransactionPinModal}/>
        </div>
    )
}

export default ImportWallet