import React from "react";
import styles from "./Messages.module.scss";
import NoMessages from "./components/NoMessages/NoMessages";
import ChatMessageHistory from "./components/ChatMessageHistory/ChatMessageHistory";
import UserProfileSection from "./components/UserProfileSection/UserProfileSection";
import ChatBodySection from "./components/ChatBodySection/ChatBodySection";

const Messages = () => {
	const messages = [];
	return (
		<div className={styles.container}>
			{messages.length === 0 ? (
				<NoMessages />
			) : (
				<div className={styles.chat_messages}>
					<ChatMessageHistory />
					<div className={styles.chat_body_desktop}>
						<ChatBodySection />
					</div>
					<div className={styles.user_profile_desk}>
						<UserProfileSection />
					</div>
				</div>
			)}
		</div>
	);
};

export default Messages;
