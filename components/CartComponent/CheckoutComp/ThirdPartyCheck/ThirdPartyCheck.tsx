"use client";

import React from "react";
import styles from "./ThirdPartyCheck.module.scss";
import Image from "next/image";
import { Button, ToggleSwitch } from "@/shared";
import { HeaderSubText } from "@/components/UserDashboard";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateCheckout } from "@/store/slices/checkoutSlice";

interface Props {
	handleNext: (e: any, skip?: boolean) => void;
	thirdPartyPricing: number;
}

const ThirdPartyCheck = ({ handleNext, thirdPartyPricing }: Props) => {
	const saleProps = useAppSelector(s => s.checkout.saleProps);
	const dispatch = useAppDispatch();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			updateCheckout({
				saleProps: {
					...saleProps,
					thirdPartyCheckup: !saleProps.thirdPartyCheckup
				}
			})
		);
	};
	return (
		<div className={styles.container}>
			<HeaderSubText title="Third party check" variant="main" />
			<div className={styles.body}>
				<div className={styles.body__top}>
					<div className={styles.left}>
						<Image
							className={styles.shield_icon}
							src="/svgs/icon-check.svg"
							alt="icon"
							height={40}
							width={40}
						/>
						<p className={styles.text}>Add Gearup third party check</p>
						<Image
							src="/svgs/gray-eror.svg"
							className={styles.gray_error}
							alt="icon"
							height={16}
							width={16}
						/>
					</div>
					<div className={styles.right}>
						<p className={styles.amount}>₦ {thirdPartyPricing}</p>
						<ToggleSwitch
							checked={saleProps.thirdPartyCheckup}
							onChange={onChange}
						/>
					</div>
				</div>

				<Button onClick={handleNext} iconSuffix="/svgs/arrow-white.svg">
					Continue
				</Button>
			</div>
		</div>
	);
};

export default ThirdPartyCheck;
