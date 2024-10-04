"use client";
import React from "react";
import styles from "./Messages.module.scss";
import NoMessages from "./components/NoMessages/NoMessages";
import ChatMessageHistory from "./components/ChatMessageHistory/ChatMessageHistory";
import UserProfileSection from "./components/UserProfileSection/UserProfileSection";
import ChatBodySection from "./components/ChatBodySection/ChatBodySection";
import { useMessages } from "@/hooks/useMessages";
import { CircularProgressLoader } from "@/shared/loaders";
import { Box } from "@mui/material";

const Messages = () => {
	const { allUserMessages, isFetchingAllUserMessages } = useMessages();

	if (isFetchingAllUserMessages) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="40rem"
			>
				<CircularProgressLoader color="#ffb30f" size={30} />
			</Box>
		);
	}

	return (
		<div className={styles.container}>
			{allUserMessages?.length === 0 ? (
				<NoMessages />
			) : (
				<div className={styles.chat_messages}>
					<ChatMessageHistory allUserMessages={allUserMessages} />
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
