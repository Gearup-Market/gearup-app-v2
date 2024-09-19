import React from "react";
import styles from "./ShippingType.module.scss";
import Image from "next/image";
import { Button, CustomRadioButton } from "@/shared";
import { HeaderSubText } from "@/components/UserDashboard";

interface Props {
	handleNext: () => void;
	handlePrev: () => void;
}

const ShippingType = ({ handleNext, handlePrev }: Props) => {
	return (
		<div className={styles.container}>
			<HeaderSubText title="Choose shipping type"  variant="main"/>
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
							<p className={styles.amount}>$120</p>
              <CustomRadioButton addPadding={false}/>
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
            
                <CustomRadioButton addPadding={false}/>
						</div>
					</div>
				</div>
				<div className={styles.button_container}>
					<Button onClick={handleNext} iconSuffix="/svgs/arrow.svg">
						Continue
					</Button>
					<Button buttonType="secondary" onClick={handlePrev} iconSuffix="/svgs/arrow.svg">
						Back
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ShippingType;
