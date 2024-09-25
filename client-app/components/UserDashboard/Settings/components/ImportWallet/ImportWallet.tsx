'use client'
import React, { useState } from 'react'
import styles from './ImportWallet.module.scss'
import { HeaderSubText } from '@/components/Admin'
import Image from 'next/image'
import { WarningIcon } from '@/shared/svgs/dashboard'
import { GoogleBackupModal, SecretPhraseModal } from './components'

enum ModalType {
    SHOW_SECRET_PHRASE = 'Show secret phrase',
    SHOW_GOOGLE_BACKUP = 'Show google backup'
}


const importOptions = [
    {
        id: 1,
        name: 'Secret phrase',
        description: 'Use a 12, 18 or 24- word seed phrase',
        icon: '/svgs/secret-phrase-icon.svg',
        modalType: ModalType.SHOW_SECRET_PHRASE
    },
    {
        id: 2,
        name: 'Google backup',
        description: 'Restore from google drive backup',
        icon: '/svgs/google-backup-icon.svg',
        modalType: ModalType.SHOW_GOOGLE_BACKUP
    },
]

const ImportWallet = () => {
    const [modals, setModals] = useState({
        showSecretPhraseModal: false,
        showGoogleBackupModal: false
    })

    const handleOpenModal = (modalType: string) => {
        if (modalType === ModalType.SHOW_GOOGLE_BACKUP) {
            setModals((prev) => ({ ...prev, showGoogleBackupModal: true }))
        } else {
            setModals((prev) => ({ ...prev, showSecretPhraseModal: true }))
        }
    }

    return (
        <div className={styles.container}>
            <HeaderSubText title="Import existing wallet" description="Transfer your current wallet and manage your funds seamlessly" />

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
                    <p>Note: <span className={styles.bold_underline}>Back up manually</span> or <span className={styles.bold_underline}>Back up with google drive</span> your existing Gearup XLM <br /> wallet so you don’t lose access to your existing assets.</p>
                </div>
            </div>

            {
                modals.showGoogleBackupModal && <GoogleBackupModal openModal={modals.showGoogleBackupModal} setOpenModal={setModals} />
            }
            {
                modals.showSecretPhraseModal && <SecretPhraseModal openModal={modals.showSecretPhraseModal} setOpenModal={setModals} />
            }
        </div>
    )
}

export default ImportWallet