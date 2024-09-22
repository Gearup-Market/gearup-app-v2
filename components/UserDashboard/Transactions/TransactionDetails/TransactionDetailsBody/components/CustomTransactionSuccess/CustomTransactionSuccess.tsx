import { SuccessCheck, WarningIcon } from "@/shared/svgs/dashboard";
import React from "react";
import styles from "./CustomTransactionSuccess.module.scss";
import Image from "next/image";

interface Props {
	openModal?: boolean;
	setOpenModal?: (value: boolean) => void;
	showWarning?: boolean;
}

const CustomTransactionSuccess = ({
	openModal,
	setOpenModal,
	showWarning = false
}: Props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<span className={styles.icon}>
					<SuccessCheck />
				</span>
				<h2 className={styles.title}>Transaction completed!</h2>

				<p className={styles.sub_text}>
					Your transaction was successfully completed. Thank you <br /> for
					trusting us with this transaction
				</p>
				{showWarning && (
					<div className={styles.note_container}>
						<span className={styles.icon}>
							<Image
								src="/svgs/transaction-warning-icon.svg"
								alt="warning"
								height={24}
								width={24}
							/>
						</span>
						<p>
							Please note that the buyer has a 48-hour window for initiating
							a return. If the buyer does not initiate a return within this
							timeframe, your payment will be processed immediately.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CustomTransactionSuccess;
