import React from "react";
import styles from "./ChatBodyElement.module.scss";
import MessageReceived from "../MessageReceived/MessageReceived";
import MessageSent from "../MessageSent/MessageSent";
import { Button, InputField } from "@/shared";
import Image from "next/image";

const ChatBodyElement = () => {
	return (
		<div className={styles.chat_body}>
			<p className={styles.chat_date}>Sun, Dec 17(Today)</p>
			<div className={styles.chat_content}>
				<div className={styles.chats}>
					<MessageReceived />
					<MessageSent />
				</div>
				<form action="" className={styles.form_container}>
					<InputField
						placeholder="Write a message..."
						inputClassName={styles.input_field}
					/>
					<Button buttonType="transparent" iconPrefix="">
						<Image
							src="/svgs/submit-icon.svg"
							alt="send"
							height={24}
							width={24}
						/>
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ChatBodyElement;
