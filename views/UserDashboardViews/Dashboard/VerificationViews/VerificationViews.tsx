"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./VerificationViews.module.scss";
import {
	PersonalIdentification,
	PhoneVerification,
	IdVerification,
	FaceMatch,
	GetStartedNav
} from "@/components/UserDashboard/GetStarted/components";
import Image from "next/image";
import { Button } from "@/shared";
import { PersonalIdentificationHandle } from "@/components/UserDashboard/GetStarted/components/PersonalIdentification/PersonalIdentification";
import { PhoneNumberFormHandle } from "@/components/UserDashboard/GetStarted/components/PhoneVerification/PhoneVerification";
import { useAppSelector } from "@/store/configureStore";
import { SmallLoader } from "@/shared/loaders";
import { IdentificationDocumentHandle } from "@/components/UserDashboard/GetStarted/components/IdVerification/IdVerification";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const VerificationViews = () => {
	const [stepCount, setStepCount] = useState(4);
	const [currentStep, setCurrentStep] = useState(1);
	const [isTokenVerified, setIsTokenVerified] = useState(false);
	const [isTokenVerification, setIsTokenVerification] = useState(false);
	const verificationState = useAppSelector(s => s.verification);
	const personalIdentificationRef = useRef<PersonalIdentificationHandle>(null);
	const documentsRef = useRef<IdentificationDocumentHandle>(null);
	const phoneNumberFormRef = useRef<PhoneNumberFormHandle>(null);
	const router = useRouter();

	const onClose = () => {
		console.log("Close");
	};

	const verificationSteps = [
		"Personal Identification",
		"Phone Verification",
		"ID Verification",
		"Face Match"
	];

	useEffect(() => {
		if (verificationState.isApproved) {
			toast.success("KYC has been Approved");
			router.push("user/dashboard");
		} else {
			if (verificationState.documentNo && verificationState.documentPhoto?.length) {
				setCurrentStep(4);
			} else if (verificationState.isPhoneNumberVerified) {
				setCurrentStep(3);
				setIsTokenVerified(true);
			} else if (!verificationState._id) {
				setCurrentStep(1);
			} else {
				setCurrentStep(2);
			}
		}
	}, [verificationState, currentStep, router]);

	const handleNextStep = () => {
		if (currentStep === stepCount) return;
		if (currentStep === 1) {
			personalIdentificationRef.current?.submitForm();
			return;
		}
		if (currentStep === 2 && !isTokenVerified) {
			phoneNumberFormRef.current?.submitForm();
			return;
		}
		if (currentStep === 3) {
			documentsRef.current?.submitForm();
			setCurrentStep(4);
			return;
		}
		setCurrentStep(currentStep + 1);
	};

	const handlePrevStep = () => {
		if (currentStep === 1) return;
		setCurrentStep(currentStep - 1);
	};

	return (
		<div className={styles.container}>
			<GetStartedNav
				stepCount={verificationSteps.length}
				currentStep={currentStep}
				steps={verificationSteps}
				onClose={onClose}
			/>
			<main className={styles.container__main_content}>
				<div className={styles.container__main_content__left_side}>
					{currentStep === 1 && (
						<PersonalIdentification
							ref={personalIdentificationRef}
							onSubmitSuccess={() => setCurrentStep(currentStep + 1)}
						/>
					)}
					{currentStep === 2 && (
						<PhoneVerification
							ref={phoneNumberFormRef}
							onSubmitSuccess={() => {
								if (!isTokenVerification) {
									setIsTokenVerification(true);
								}
							}}
							isTokenVerification={isTokenVerification}
							setIsTokenVerified={setIsTokenVerified}
						/>
					)}
					{currentStep === 3 && (
						<IdVerification
							ref={documentsRef}
							onSubmitSuccess={() => setCurrentStep(currentStep + 1)}
						/>
					)}
					{currentStep === 4 && <FaceMatch />}
				</div>
				<div className={styles.container__main_content__right_side}>
					<div className={styles.img_container}>
						<Image
							src="/svgs/verification-bg.svg"
							height={600}
							width={600}
							alt="Verification"
						/>
					</div>
				</div>
			</main>
			<div className={styles.button_container} data-page={currentStep}>
				{currentStep > 1 && (
					<Button
						onClick={handlePrevStep}
						buttonType="secondary"
						className={styles.container__btn_started}
					>
						Back
					</Button>
				)}
				{currentStep < stepCount && (
					<Button
						onClick={handleNextStep}
						buttonType="primary"
						iconSuffix="/svgs/color-arrow.svg"
						className={styles.container__btn_started}
						disabled={verificationState.isLoading}
					>
						Continue {verificationState.isLoading && <SmallLoader />}
					</Button>
				)}
			</div>
		</div>
	);
};

export default VerificationViews;
