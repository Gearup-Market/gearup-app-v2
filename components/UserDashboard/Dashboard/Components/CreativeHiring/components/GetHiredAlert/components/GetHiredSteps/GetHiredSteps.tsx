import React, { useState } from 'react'
import styles from './GetHiredSteps.module.scss'
import StepThree from '../StepThree/StepThree'
import StepTwo from '../StepTwo/StepTwo'
import StepOne from '../StepOne/StepOne'
import Modal from '@/shared/modals/modal/Modal'
import { Button } from '@/shared'

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
    const lastStep = stepsLength === activeStep


    const handleSaveProceed = () => {
        if (activeStep < stepsLength) {
            setActiveStep(prevState => prevState + 1)
        } else {
            onClose()
        }
    }

    const handleCloseModal = () => {
        onClose()
        setActiveStep(ActiveStepEnum.StepOne)
    }

    return (
        <Modal
            openModal={isOpen}
            setOpenModal={handleCloseModal}
            className={styles.container}
            title=""
        >
            <h3 className={styles.step_count}>Step {activeStep} of {stepsLength}</h3>
            {activeStep === ActiveStepEnum.StepOne && <StepOne />}
            {activeStep === ActiveStepEnum.StepTwo && <StepTwo />}
            {activeStep === ActiveStepEnum.StepThree && <StepThree />}
            <Button onClick={handleSaveProceed} className={styles.save_proceed_btn}>{!lastStep ? "Save & proceed" : "Continue"}</Button>
        </Modal>
    )
}

export default GetHiredSteps