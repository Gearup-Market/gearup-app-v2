"use client";
import React from "react";
import styles from "./Messages.module.scss";
import NoMessages from "./components/NoMessages/NoMessages";
import ChatMessageHistory from "./components/ChatMessageHistory/ChatMessageHistory";
import UserProfileSection from "./components/UserProfileSection/UserProfileSection";
import ChatBodySection from "./components/ChatBodySection/ChatBodySection";
import { CircularProgressLoader } from "@/shared/loaders";
import { Box } from "@mui/material";
import { useGetUserMessages } from "@/app/api/hooks/messages";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/configureStore";

const Messages = () => {
	const { userId } = useAppSelector((state) => state.user)
	const { data: allUserMessages, isFetching: isFetchingAllUserMessages } = useGetUserMessages(userId);
	const searchParams = useSearchParams()
	const participantId = searchParams.get("participantId")
	const listingId = searchParams.get("listingId")

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
			{allUserMessages?.data.length === 0 && (!participantId || !listingId) ? (
				<NoMessages />
			) : (
				<div className={styles.chat_messages}>
					<ChatMessageHistory allUserMessages={allUserMessages?.data || []} />
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
