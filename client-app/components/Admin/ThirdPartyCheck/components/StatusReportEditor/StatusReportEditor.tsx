import React, { useRef, useEffect } from 'react';
import Modal from '@/shared/modals/modal/Modal';
import styles from './StatusReportEditor.module.scss';
import { CustomTextEditor } from '@/shared';

interface TrixEditorProps {
    value: string;
    onChange: (value: string) => void;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

const TextEditorModal: React.FC<TrixEditorProps> = ({ onChange, value, openModal, setOpenModal }) => {


    const onClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal openModal={openModal} setOpenModal={onClose} title='Give status report'>
            <div className={styles.form_container}>
                <CustomTextEditor value={value} setValue={onChange} placeholder='enter status report' />
            </div>
        </Modal>
    );
};

export default TextEditorModal;
