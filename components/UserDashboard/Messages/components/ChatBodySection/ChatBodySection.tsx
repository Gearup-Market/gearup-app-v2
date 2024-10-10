"use client";
import React from "react";
import styles from "./ChatBodySection.module.scss";
import { VerifyIcon } from "@/shared/svgs/dashboard";
import Image from "next/image";
import ChatBodyElement from "./Components/ChatBodyElement/ChatBodyElement";
import { useSearchParams } from "next/navigation";
import { IUserResp } from "@/app/api/hooks/users/types";
import { queryClient } from "@/app/api";
import { iGetListingResp } from "@/app/api/hooks/listings/types";
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
	const {
		data: listing,
	} = useGetListingById(listingId as string);
	
	return (
		<div className={styles.container} data-borders={showAllBorder}>
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
							<span className={styles.date}> 1:23 PM GMT +8 ⋅</span>{" "}
							<span className={styles.convo_about}>
								{listing?.data?.productName}
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
	);
};

export default ChatBodySection;
