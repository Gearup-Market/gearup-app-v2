'use client'
import React, { useState } from 'react'
import styles from './CourseListingView.module.scss'
import { PersonalIdentification, PhoneVerification, } from '@/components/UserDashboard/GetStarted/components'
import Image from 'next/image'
import { Button } from '@/shared'
import { CourseContent, CourseDetails, NewCourseListingsNav } from '@/components/UserDashboard/Listings/NewCourseListings/components'


const CourseListingView = () => {
    const [stepCount, setStepCount] = useState(4)
    const [currentStep, setCurrentStep] = useState(1)
    const [isTokenVerified, setIsTokenVerified] = useState(false)
    const [isTokenVerification, setIsTokenVerification] = useState(false)

    const onClose = () => {
        console.log('Close')
    }

    const verificationSteps = [
        "Course Details",
        "Course Content",
    ]

    const handleNextStep = () => {
        if (currentStep === stepCount) return
        if (currentStep === 2 && !isTokenVerified) {
            setIsTokenVerification(true)
            return
        }
        setCurrentStep(currentStep + 1)
    }

    const handlePrevStep = () => {
        if (currentStep === 1) return
        setCurrentStep(currentStep - 1)
    }

    return (
        <div className={styles.container}>
            <NewCourseListingsNav stepCount={verificationSteps.length} currentStep={currentStep} steps={verificationSteps} onClose={onClose} />
            <main className={styles.container__main_content}>
                <div className={styles.container__main_content__left_side}>
                    {
                        currentStep === 1 && <CourseDetails />
                    }
                    {
                        currentStep === 2 && <CourseContent />
                    }
                </div>
                <div className={styles.container__main_content__right_side}>
                    <div className={styles.img_container}>
                        <Image src="/svgs/course-listing-img.svg" height={600} width={600} alt="Verification" />
                    </div>
                </div>
            </main>
            <div className={styles.button_container} data-page={currentStep}>
                {
                    currentStep > 1 && <Button onClick={handlePrevStep} buttonType='secondary' className={styles.container__btn_started}>
                        Back
                    </Button>
                }
                {
                    currentStep < stepCount && <Button onClick={handleNextStep} buttonType='primary' iconSuffix='/svgs/color-arrow.svg' className={styles.container__btn_started}>
                        {
                            currentStep === 2 ? 'Publish' : 'Save & Continue'
                        }

                    </Button>
                }
            </div>
        </div>
    )
}

export default CourseListingView