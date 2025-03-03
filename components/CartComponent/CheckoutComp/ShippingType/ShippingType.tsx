import React, { useMemo } from "react";
import styles from "./ShippingType.module.scss";
import Image from "next/image";
import { Button, CustomRadioButton } from "@/shared";
import { HeaderSubText } from "@/components/UserDashboard";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateCheckout } from "@/store/slices/checkoutSlice";

interface Props {
	handleNext: (e: any, skip?: boolean) => void;
	handlePrev: () => void;
}

const ShippingType = ({ handleNext, handlePrev }: Props) => {
	const saleProps = useAppSelector(s => s.checkout.saleProps);
	const dispatch = useAppDispatch();

	const isShipping = useMemo(() => saleProps.shippingType === "shipping", [saleProps]);
	const isLocalPickup = useMemo(
		() => saleProps.shippingType === "localpickup",
		[saleProps]
	);

	const handleChange = (e: any) => {
		const { name } = e.target;
		dispatch(
			updateCheckout({
				saleProps: {
					...saleProps,
					shippingType: name
				}
			})
		);
	};

	const handleNextWizard = (e: any) => {
		handleNext(e, !!isLocalPickup);
	};

	return (
		<div className={styles.container}>
			<HeaderSubText title="Choose shipping type" variant="main" />
			<div className={styles.body}>
				<div className={styles.top_container}>
					<div className={styles.body__top}>
						<div className={styles.left}>
							<Image
								className={styles.shield_icon}
								src="/svgs/shipping-icon.svg"
								alt="icon"
								height={40}
								width={40}
							/>
							<p className={styles.text}>Shipping</p>
						</div>
						<div className={styles.right}>
							{/* <p className={styles.amount}>$120</p> */}
							<CustomRadioButton
								addPadding={false}
								checked={isShipping}
								name="shipping"
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className={styles.body__top}>
						<div className={styles.left}>
							<Image
								className={styles.shield_icon}
								src="/svgs/pickup-icon.svg"
								alt="icon"
								height={40}
								width={40}
							/>
							<p className={styles.text}>Local pickup</p>
						</div>
						<div className={styles.right}>
							<CustomRadioButton
								addPadding={false}
								checked={!isShipping}
								name="localpickup"
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
				<div className={styles.button_container}>
					<Button onClick={handleNextWizard} iconSuffix="/svgs/arrow-white.svg">
						Continue
					</Button>
					<Button buttonType="secondary" onClick={handlePrev}>
						Back
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ShippingType;
