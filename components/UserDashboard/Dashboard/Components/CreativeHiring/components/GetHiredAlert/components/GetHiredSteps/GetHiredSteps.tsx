import React, { useState } from 'react'
import styles from './GetHiredSteps.module.scss'
import StepThree from '../StepThree/StepThree'
import StepTwo from '../StepTwo/StepTwo'
import StepOne from '../StepOne/StepOne'
import Modal from '@/shared/modals/modal/Modal'

enum ActiveStepEnum {
    StepOne = 1,
    StepTwo = 2,
    StepThree = 3,
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const GetHiredSteps = ({ isOpen, onClose }: Props) => {
    const [activeStep, setActiveStep] = useState(ActiveStepEnum.StepOne)
    const stepsLength = Object.keys(ActiveStepEnum).length / 2

    return (
        <Modal
            openModal={isOpen}
            setOpenModal={onClose}
            className={styles.container}
            title=""
        >
            <h3 className={styles.step_count}>Step {activeStep} of {stepsLength}</h3>
            {activeStep === ActiveStepEnum.StepOne && <StepOne />}
            {activeStep === ActiveStepEnum.StepTwo && <StepTwo />}
            {activeStep === ActiveStepEnum.StepThree && <StepThree />}
        </Modal>
    )
}

export default GetHiredSteps