"use client";
import React, { useState } from "react";
import styles from "./ChatMessageHistory.module.scss";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { CustomImage, InputField } from "@/shared";
import ChatBodyElement from "../ChatBodySection/Components/ChatBodyElement/ChatBodyElement";
import UserProfileSection from "../UserProfileSection/UserProfileSection";
import { ChevronIcon } from "@/shared/svgs/dashboard";
import { MessageData } from "@/app/api/hooks/messages/typesx";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFetchUserDetailsById } from "@/hooks/useUsers";
import { useResponsive } from "@/hooks";

interface ShowScreen {
	chatHistory: boolean;
	chatBody: boolean;
	userProfile: boolean;
}

interface Props {
	allUserMessages?: MessageData[];
}

const ChatMessageHistory = ({ allUserMessages }: Props) => {
	const searchParams = useSearchParams();
	const activeId = searchParams.get("activeChatId")
	const [activeChatId, setActiveChatId] = useState<string | null>(activeId);
	const pathname = usePathname()
	const [showMessageDetails, setShowMessageDetails] = useState<boolean>(false);
	const router = useRouter()
	const { user } = useAuth();
	const {isMobile} = useResponsive();
	const [showScreen, setShowScreen] = useState<ShowScreen>({
		chatHistory: true,
		chatBody: false,
		userProfile: false
	});

	console.log(allUserMessages,"userMessages")
	const handleMessageClick = (chat: MessageData) => {
		const id = chat._id;
		const participantId = chat?.participants?.find(item => item?._id !== user?._id)?._id || "";
		setShowMessageDetails(true);
		setActiveChatId(id);
		console.log(chat)
		console.log(participantId)
		// return
		if (!!participantId) {
			const currentParams = new URLSearchParams(searchParams.toString());
			currentParams.set('participantId', participantId);
			currentParams.set("activeChatId", id)
			router.push(`${pathname}?${currentParams.toString()}`); 
		}
		if(!isMobile) return;
		setShowScreen({
			chatHistory: false,
			chatBody: true,
			userProfile: false
		});
	};

	const handleSeeDetails = () => {
		setShowMessageDetails(false);
		if(!isMobile) return;
		setShowScreen({
			chatHistory: false,
			chatBody: false,
			userProfile: true
		});
	};

	const handleBack = () => {
		if (showScreen.userProfile) {
			setShowMessageDetails(true);
			if(!isMobile) return;
			setShowScreen({
				chatHistory: false,
				chatBody: true,
				userProfile: false
			});
		} else if (showScreen.chatBody) {
			setShowMessageDetails(false);
			if(!isMobile) return;
			setShowScreen({
				chatHistory: true,
				chatBody: false,
				userProfile: false
			});
		}
	};

	return (
		<div className={styles.container}>
			<button
				className={styles.nav_container}
				onClick={handleBack}
				data-show={
					(showScreen.chatBody || showScreen.userProfile) &&
					!showScreen.chatHistory
				}
			>
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
					{allUserMessages?.map(chat => (
						<ChatItem
							key={chat._id}
							chat={chat}
							onClick={() => handleMessageClick(chat)}
							active={activeChatId === chat._id}
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
	chat: MessageData;
	onClick: () => void;
	active: boolean;
}) => {
	const { user } = useAuth();
	const searchParams = useSearchParams();
	const participantId = searchParams.get("participantId");
	const { fetchingUser, user: participant } = useFetchUserDetailsById(
		participantId ?? ""
	);

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
					<div className={styles.name}>{participant?.userName}</div>
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
