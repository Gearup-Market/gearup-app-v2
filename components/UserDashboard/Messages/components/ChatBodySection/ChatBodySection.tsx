"use client";
import React from "react";
import styles from "./ChatBodySection.module.scss";
import { VerifyIcon } from "@/shared/svgs/dashboard";
import Image from "next/image";
import ChatBodyElement from "./Components/ChatBodyElement/ChatBodyElement";
import { useSearchParams } from "next/navigation";
import { useGetUserDetails } from "@/app/api/hooks/users";
import { useGetListingById } from "@/app/api/hooks/listings";

interface ChatBodySectionProps {
	showAllBorder?: boolean;
}

const ChatBodySection = ({ showAllBorder }: ChatBodySectionProps) => {
	const searchParams = useSearchParams();
	const participantId = searchParams.get("participantId");
	const listingId = searchParams.get("listingId");
	const { data } = useGetUserDetails({
		userId: participantId as string
	});

	const { data: listing } = useGetListingById(listingId as string);

	return (
		<div className={styles.container} data-borders={showAllBorder}>
			<ReUseableChatHeader data={data} listing={listing} />
			<ChatBodyElement />
		</div>
	);
};

export default ChatBodySection;

export const ReUseableChatHeader = ({ data, listing }: { data: any; listing: any }) => {
	return (
		<div className={styles.header}>
			<div className={styles.left}>
				<div className={styles.user_alias}>
					<Image
						src={data?.data?.avatar || "/svgs/user.svg"}
						alt={data?.data?.userName}
						fill
					/>
				</div>
				<div>
					<p className={styles.name}>
						{data?.data?.name || data?.data?.userName}
						{data?.data?.isVerified && (
							<span className={styles.verfiy_icon}>
								<VerifyIcon />
							</span>
						)}
					</p>
					<div className={styles.date_convo_about}>
						{/* <span className={styles.date}> </span>{" "} */}
						<span className={styles.convo_about}>
							conversations about {listing?.data?.productName}
						</span>
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<span className={styles.icon}>
					<Image src="/svgs/call.svg" alt="phone-icon" height={30} width={30} />
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
	);
};
