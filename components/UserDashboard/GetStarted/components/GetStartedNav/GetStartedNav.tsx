// components/Navbar.tsx
"use client";
import React from "react";
import styles from "./GetStartedNav.module.scss";
import ProgressBar from "@/shared/progressBar/ProgressBar";
import Image from "next/image";
import { CloseIcon } from "@/shared/svgs/dashboard";
import Link from "next/link";

interface NavbarProps {
	stepCount: number;
	currentStep: number;
	steps: string[];
	onClose: () => void;
}

const GetStartedNav: React.FC<NavbarProps> = ({
	stepCount,
	currentStep,
	steps,
	onClose
}) => {
	const progress = (currentStep / stepCount) * 100;

	return (
		<nav className={styles.container}>
			<div className={styles.container__top}>
				<div className={styles.container__top__left}>
					<div className={styles.logo}>
						<Image
							src="/images/logo.png"
							height={25}
							width={100}
							alt="Logo"
						/>
					</div>
					<div className={styles.steps_container}>
						<span className={styles.step_count}>
							Step {currentStep} of {stepCount}
						</span>
						:
						<span className={styles.step_names}>
							{steps[currentStep - 1]}
						</span>
					</div>
				</div>
				<div className={styles.container__top__right}>
					<Link
						href={"/user/dashboard"}
						className={styles.close_button}
						onClick={onClose}
					>
						<span className={styles.exit_text}>Exit</span>
						<CloseIcon />
					</Link>
				</div>
			</div>
			<div className={styles.progress_bar}>
				<ProgressBar percent={progress} height={4} radius={8} type="customized" />
			</div>
		</nav>
	);
};

export default GetStartedNav;
