import React from "react";
import styles from "./NoMessages.module.scss";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import Image from "next/image";

const NoMessages = () => {
	return (
		<div className={styles.container}>
			<HeaderSubText title="Messages" variant="main" />
			<div className={styles.no_messages}>
				<div>
					<Image
						height={40}
						width={40}
						src="/svgs/messages.svg"
						alt="No messages"
					/>
				</div>
				<p className={styles.title}>No Recent Chat</p>
			</div>
		</div>
	);
};

export default NoMessages;
