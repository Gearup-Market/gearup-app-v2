import React from "react";
import styles from "./MessageReceived.module.scss";

interface Props {
	message?: string;
	timestamp?: string;
}

const MessageReceived = ({ message, timestamp }: Props) => {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<h3>{message}</h3>
				{timestamp && (
					<p className={styles.timestamp}>
						{new Date(timestamp).toLocaleTimeString("en-US", {
							hour: "numeric",
							minute: "numeric",
							hour12: true
						})}
					</p>
				)}
			</div>
		</div>
	);
};

export default MessageReceived;
