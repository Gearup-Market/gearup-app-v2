"use client";
import React from "react";
import styles from "./ChatMessageHistory.module.scss";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { CustomImage, InputField } from "@/shared";
import { chatsMessages } from "@/mock/chats.mock";

interface ChatHistory {
	id: string;
	participants: Participant[];
	messages: Message[];
}

interface Participant {
	name: string;
	image: string;
}

interface Message {
	sender: string;
	message: string;
	timestamp: string; // ISO 8601 format
}

interface ChatData {
	chatHistory: ChatHistory[];
}

const ChatMessageHistory = () => {
	const [activeChatId, setActiveChatId] = React.useState<string | null>("chat1");
	return (
		<div className={styles.container}>
			<HeaderSubText title="Messages" />
			<InputField
				placeholder="search chat"
				icon="/svgs/icon-search-dark.svg"
				iconTitle="search-icon"
			/>
			<div className={styles.chat_items}>
				{chatsMessages.chatHistory.map(chat => (
					<ChatItem
						key={chat.id}
						chat={chat}
						onClick={() => setActiveChatId(chat.id)}
						active={activeChatId === chat.id}
					/>
				))}
			</div>
		</div>
	);
};

export default ChatMessageHistory;

const ChatItem = ({
	chat,
	onClick,
	active
}: {
	chat: ChatHistory;
	onClick: () => void;
	active: boolean;
}) => {
	const userName = chat.participants.find(
		participant => participant.name.toLowerCase() !== "you"
	)?.name;
	return (
		<div className={styles.chat} data-active={active} onClick={onClick}>
			<div className={styles.left}>
				<div className={styles.chat_image}>
					<CustomImage
						src="/svgs/avatar.svg"
						height={40}
						width={40}
						alt="avatar"
					/>
				</div>
				<div className={styles.details}>
					<div className={styles.name}>{userName}</div>
					<div className={styles.message}>Hello, how are you?</div>
				</div>
			</div>
			<div className={styles.right}>
				<span className={styles.time}>2h</span>
				{chat.messages.length > 1 && (
					<span className={styles.chat_count}>{chat.messages.length}</span>
				)}
			</div>
		</div>
	);
};
