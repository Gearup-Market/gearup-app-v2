"use client";

import React, { useMemo } from "react";
import styles from "./GetStarted.module.scss";
import { Button, RadioInput } from "@/shared";
import ProgressBar from "@/shared/progressBar/ProgressBar";
import Link from "next/link";
import { useAppSelector } from "@/store/configureStore";

interface Props {
	title: string;
	description?: string;
}
const GetStarted = ({
	title = "Let’s help you get verified",
	description = ""
}: Props) => {
	const verificationState = useAppSelector(s => s.verification);
	const user = useAppSelector(s => s.user);
	const verificationSteps = useMemo(
		() => [
			{
				title: "Personal identification",
				completed: !!verificationState._id
			},
			{
				title: "Phone number verification",
				completed: verificationState.isPhoneNumberVerified
			},
			{
				title: "ID verification",
				completed:
					verificationState.documentPhoto &&
					verificationState.documentPhoto.length > 0
			},
			// {
			// 	title: "Set up account pin",
			// 	completed: !!user.accountPin
			// },
			{
				title: "Face match",
				completed: verificationState.isSubmitted
			}
		],
		[verificationState]
	);

	const totalCompleted = useMemo(() => {
		let value = 0;
		verificationSteps.forEach(s => {
			if (s.completed) {
				value += (1 / verificationSteps.length) * 100;
			}
		});
		return value;
	}, [verificationSteps]);

	return (
		<div className={styles.container}>
			<div className={styles.container__subtext_container}>
				<p className={styles.container__subtext_container__subtext}>
					{verificationState.isRejected && !verificationState.isApproved
						? "KYC was rejected"
						: verificationState.isApproved
						? "KYC has been approved"
						: title}
				</p>
				<p className={styles.container__subtext_container__percentage}>
					{totalCompleted}% Complete
				</p>
			</div>
			<p className={styles.container__description}>
				{verificationState.rejectionMessage
					? verificationState.rejectionMessage
					: description}
			</p>
			<ProgressBar
				percent={totalCompleted}
				height={8}
				radius={8}
				type="customized"
			/>
			<div>
				<ul className={styles.container__steps_container}>
					{verificationSteps.map((step, index) => (
						<li
							key={index}
							className={styles.container__steps_container__step}
						>
							<RadioInput
								checked={!!step.completed}
								disabled={true}
								onChange={() => {}}
							/>
							<span>{step.title}</span>
						</li>
					))}
				</ul>
			</div>
			<Button
				buttonType="transparent"
				iconSuffix="/svgs/color-arrow.svg"
				className={styles.container__btn_started}
			>
				<Link href="/verification">
					{totalCompleted > 10 ? "Continue" : "Get Started"}
				</Link>
			</Button>
		</div>
	);
};

export default GetStarted;
