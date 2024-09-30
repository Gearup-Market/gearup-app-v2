"use client";
import React, { useState } from "react";
import styles from "./ChatMessageHistory.module.scss";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { BackNavigation, CustomImage, InputField } from "@/shared";
import { chatsMessages } from "@/mock/chats.mock";
import ChatBodyElement from "../ChatBodySection/Components/ChatBodyElement/ChatBodyElement";
import UserProfileSection from "../UserProfileSection/UserProfileSection";
import { ChevronIcon } from "@/shared/svgs/dashboard";

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

interface ShowScreen {
	chatHistory: boolean;
	chatBody: boolean;
	userProfile: boolean;
}

const ChatMessageHistory = () => {
	const [activeChatId, setActiveChatId] = useState<string | null>("chat1");
	const [showMessageDetails, setShowMessageDetails] = useState<boolean>(false);
	const [showScreen, setShowScreen] = useState<ShowScreen>({
		chatHistory: true,
		chatBody: false,
		userProfile: false
	});

	const handleMessageClick = (id: string) => {
		setShowMessageDetails(true);
		setActiveChatId(id);
		setShowScreen({
			chatHistory: false,
			chatBody: true,
			userProfile: false
		});
	};

	const handleSeeDetails = () => {
		setShowMessageDetails(false);
		setShowScreen({
			chatHistory: false,
			chatBody: false,
			userProfile: true
		});
	};

	const handleBack = () => {
		if(showScreen.userProfile){
			setShowMessageDetails(true);
			setShowScreen({
				chatHistory: false,
				chatBody: true,
				userProfile: false
			});
		}else if(showScreen.chatBody){
			setShowMessageDetails(false);
			setShowScreen({
				chatHistory: true,
				chatBody: false,
				userProfile: false
			});
		}
	};

	return (
		<div className={styles.container}>
			<button className={styles.nav_container} onClick={handleBack} data-show={(showScreen.chatBody || showScreen.userProfile) && !showScreen.chatHistory }>
				<span className={styles.icon}>
					<ChevronIcon color="#4E5054" />
				</span>
				<p>Back</p>
			</button>
			<div className={styles.header}>
				<HeaderSubText title="Messages" />
				<p
					onClick={handleSeeDetails}
					data-show={showMessageDetails}
					className={styles.see_details}
				>
					See details
				</p>
			</div>
			<div className={styles.chat_history} data-show={showScreen.chatHistory}>
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
							onClick={() => handleMessageClick(chat.id)}
							active={activeChatId === chat.id}
						/>
					))}
				</div>
			</div>
			<div className={styles.chat_body_mob} data-show={showScreen.chatBody}>
				<ChatBodyElement />
			</div>
			<div className={styles.user_profile_mob} data-show={showScreen.userProfile}>
				<UserProfileSection />
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
