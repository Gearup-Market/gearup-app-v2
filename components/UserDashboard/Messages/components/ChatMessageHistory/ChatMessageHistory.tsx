"use client";
import React, { useEffect, useState } from "react";
import styles from "./ChatMessageHistory.module.scss";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { CustomImage, InputField } from "@/shared";
import ChatBodyElement from "../ChatBodySection/Components/ChatBodyElement/ChatBodyElement";
import UserProfileSection from "../UserProfileSection/UserProfileSection";
import { ChevronIcon, VerifyIcon } from "@/shared/svgs/dashboard";
import { MessageData } from "@/app/api/hooks/messages/typesx";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useResponsive } from "@/hooks";
import { timeSince } from "@/utils";
import { useGetUserDetails } from "@/app/api/hooks/users";
import { useGetListingById } from "@/app/api/hooks/listings";
import Image from "next/image";

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
	const activeId = searchParams.get("activeChatId");
	const [activeChatId, setActiveChatId] = useState<string | null>(activeId);
	const pathname = usePathname();
	const [showMessageDetails, setShowMessageDetails] = useState<boolean>(false);
	const participantId = searchParams.get("participantId");
	const router = useRouter();
	const { user } = useAuth();
	const { isMobile } = useResponsive();
	const [showScreen, setShowScreen] = useState<ShowScreen>({
		chatHistory: true,
		chatBody: false,
		userProfile: false
	});

	const listingId = searchParams.get("listingId");
	const { data } = useGetUserDetails({
		userId: participantId as string
	});

	const {
		data: listing,
	} = useGetListingById(listingId as string);


	// Set the first chat as active chat if no chat is active
	useEffect(() => {
		console.log(allUserMessages, "allUserMessages");
		if (!participantId && !activeChatId && allUserMessages?.length) {
			const currentParams = new URLSearchParams(searchParams.toString());
			currentParams.set(
				"participantId",
				allUserMessages[0]?.participants?.find(item => item?.userId !== user?._id)
					?.userId || ""
			);
			currentParams.set("activeChatId", allUserMessages[0]?._id || "");
			if(allUserMessages[0]?.listingItem?._id){
				currentParams.set("listingId", allUserMessages[0]?.listingItem?._id || "");
			}
			router.push(`${pathname}?${currentParams.toString()}`);
		}
	}, [allUserMessages]);

	const handleMessageClick = (chat: MessageData) => {
		const id = chat._id;
		const participantId =
			chat?.participants?.find(item => item?.userId !== user?._id)?.userId || "";
		setShowMessageDetails(true);
		setActiveChatId(id);
		// return
		if (!!participantId) {
			const currentParams = new URLSearchParams(searchParams.toString());
			currentParams.set("participantId", participantId);
			currentParams.set("activeChatId", id);
			if(chat?.listingItem?._id){
				currentParams.set("listingId", chat?.listingItem?._id || "");
			}
			router.push(`${pathname}?${currentParams.toString()}`);
		}
		if (!isMobile) return;
		setShowScreen({
			chatHistory: false,
			chatBody: true,
			userProfile: false
		});
	};

	const handleSeeDetails = () => {
		setShowMessageDetails(false);
		if (!isMobile) return;
		setShowScreen({
			chatHistory: false,
			chatBody: false,
			userProfile: true
		});
	};

	const handleBack = () => {
		if (showScreen.userProfile) {
			setShowMessageDetails(true);
			if (!isMobile) return;
			setShowScreen({
				chatHistory: false,
				chatBody: true,
				userProfile: false
			});
		} else if (showScreen.chatBody) {
			setShowMessageDetails(false);
			if (!isMobile) return;
			setShowScreen({
				chatHistory: true,
				chatBody: false,
				userProfile: false
			});
		}
	};

	// a useEffect to reset the view on large screen
	useEffect(() => {
		if (!isMobile) {
			setShowScreen({
				chatHistory: true,
				chatBody: false,
				userProfile: false
			});
		}
	}, [isMobile]);

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
			{/* <ReUseableChatHeader data={data} listing={listing} /> */}
			<div className={styles.header}>
			<div className={styles.left}>
				<span className={styles.user_alias}>{data?.data.userName[0]}</span>
				<div>
					<p className={styles.name}>
						{data?.data?.name || data?.data?.userName}
						{
							data?.data?.isVerified &&
							<span className={styles.verfiy_icon}>
								<VerifyIcon />
							</span>
						}
					</p>
					<div className={styles.date_convo_about}>
						{/* <span className={styles.date}> </span>{" "} */}
						<span className={styles.convo_about}>
							conversations about	{listing?.data?.productName}
						</span>
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<span className={styles.icon}>
					<Image
						src="/svgs/call.svg"
						alt="phone-icon"
						height={30}
						width={30}
					/>
				</span>
				<span className={styles.icon}>
					<Image
						src="/svgs/error.svg"
						alt="error-icon"
						height={30}
						width={30}
					/>
				</span>
			</div>
		</div>
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

	const participant = chat.participants.find(item => item.userId !== user?._id);
	const lastMessage = chat.messages[chat?.messages?.length - 1];
	const lastMessageTime = timeSince(new Date(lastMessage?.timestamp));


	return (
		<div className={styles.chat} data-active={active} onClick={onClick}>
			<div className={styles.left}>
				<div className={styles.chat_image}>
					<CustomImage
						src={!!participant?.avatar ? participant?.avatar : "/svgs/avatar-user.svg"}
						height={40}
						width={40}
						alt="avatar"
						style={{ borderRadius: "50%" }}
					/>
				</div>
				<div className={styles.details}>
					<div className={styles.name}>{participant?.userName}</div>
					<div className={styles.message}>
						{lastMessage?.message}
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<span className={styles.time}>{lastMessageTime}</span>
				{chat.messages.length > 1 && (
					<span className={styles.chat_count}>{chat.messages.length}</span>
				)}
			</div>
		</div>
	);
};
