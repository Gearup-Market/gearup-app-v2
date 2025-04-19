"use client";
import React, { useState } from "react";
import styles from "./CourseTransactions.module.scss";
import { CopyIcon } from "@/shared/svgs/dashboard";
import { Ratings } from "@/shared";
import { PersonalDetails, ReceiptDetails } from "../DetailsSummary/components";
import { iTransactionDetails } from "@/interfaces";
import { formatHyphenText } from "@/utils/formatHyphenText";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
import { formatDate } from "@/utils";
import { useCopy } from "@/hooks";
import { CourseType } from "@/views/CourseListingView/CourseListingView";
import format from "date-fns/format";
import { shortenTitle } from "@/utils";
import { LiveSessionDetails } from "@/store/slices/addCourseSlice";
interface Props {
	transaction?: iTransactionDetails;
}

const CourseTransactions = ({ transaction }: Props) => {
	const handleCopy = useCopy();
	return (
		<div className={styles.container}>
			<div className={styles.container__left}>
				<div className={styles.container__left__summary_container}>
					<h3 className={styles.title}>Summary</h3>
					<div className={styles.summary_item}>
						<h4>Transaction type</h4>
						<p>
							{formatHyphenText(
								!isListing(
									transaction?.listing,
									transaction?.itemType as string
								)
									? (transaction?.listing?.courseType as string)
									: ""
							)}
						</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Transaction date</h4>
						<p>{formatDate(transaction?.createdAt)}</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Transaction ID</h4>
						<span
							style={{ display: "flex", alignItems: "center", gap: "10px" }}
						>
							<p>
								{shortenTitle(
									transaction?.listing?.transactionId as string
								)}
							</p>
							<span
								className={styles.icon}
								onClick={() =>
									handleCopy(
										transaction?.listing?.transactionId as string
									)
								}
							>
								<CopyIcon />
							</span>
						</span>
					</div>

					<div className={styles.bottom_section}>
						<div className={styles.summary_item}>
							<h4>Link to course</h4>
							<span
								style={{
									display: "flex",
									alignItems: "center",
									gap: "10px",
									paddingRight: "2rem"
								}}
							>
								<span className={styles.ellipse_container}>
									<p>
										{isListing(
											transaction?.listing,
											transaction?.itemType as string
										)
											? ""
											: transaction?.listing?.link}
									</p>
								</span>
								<span
									className={styles.icon}
									onClick={() =>
										handleCopy(
											transaction?.listing?.transactionId as string
										)
									}
								>
									<CopyIcon />
								</span>
							</span>
						</div>
						{!isListing(
							transaction?.listing,
							transaction?.itemType as string
						) &&
							transaction?.listing?.courseType === CourseType.Live && (
								<LiveCourse
									liveSessionDetails={
										transaction?.listing
											?.liveSessionDetails as LiveSessionDetails
									}
								/>
							)}
						{!isListing(
							transaction?.listing,
							transaction?.itemType as string
						) &&
							transaction?.listing?.courseType === CourseType.Ebook && (
								<EbooksType
									link={transaction?.listing?.link}
									pages={transaction?.listing?.ebooks?.pages || 0}
									size={transaction?.listing?.ebooks?.size || ""}
								/>
							)}
						{!isListing(
							transaction?.listing,
							transaction?.itemType as string
						) &&
							transaction?.listing?.courseType === CourseType.Video && (
								<VideosType
									link={transaction?.listing?.link}
									duration={
										transaction?.listing?.videoTutorials?.duration ||
										""
									}
									size={
										transaction?.listing?.videoTutorials?.size || ""
									}
								/>
							)}
						{!isListing(
							transaction?.listing,
							transaction?.itemType as string
						) &&
							transaction?.listing?.courseType === CourseType.Audio && (
								<AudiosType
									link={transaction?.listing?.link}
									duration={
										transaction?.listing?.audioTutorials?.duration ||
										""
									}
									size={
										transaction?.listing?.audioTutorials?.size || ""
									}
								/>
							)}
					</div>
				</div>
			</div>
			<div className={styles.container__right}>
				<div
					className={styles.container__left__summary_container}
					style={{ maxHeight: "10.9rem" }}
				>
					<h3 className={styles.rating_title}>Your rating</h3>
					<Ratings />
				</div>
				{transaction?.isBuyer && (
					<PersonalDetails
						name={transaction?.seller?.userName as string}
						subText="Tutor"
						profileLink={`/users/${transaction?.seller?._id}`}
						profilePhoto={transaction?.seller?.avatar || "/svgs/user.svg"}
						forSale={false}
					/>
				)}
				<ReceiptDetails />
			</div>
		</div>
	);
};

export default CourseTransactions;

export interface LiveProps {
	liveSessionDetails: LiveSessionDetails;
}

export const LiveCourse = ({ liveSessionDetails }: LiveProps) => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Course type</h4>
				<p>Live Tutorials</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>{liveSessionDetails.sessions[0].durationMinutes} minutes</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Starts</h4>
				<p>{format(liveSessionDetails.dateRange.startDate, "MM/dd/yyyy")}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Ends</h4>
				<p>{format(liveSessionDetails.dateRange.endDate, "MM/dd/yyyy")}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Time zone</h4>
				<p>{liveSessionDetails.timeZone}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Session Capacity</h4>
				<p>{liveSessionDetails.sessionCapacity}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Frequency</h4>
				<p>{liveSessionDetails.sessions[0].frequency}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Days of week</h4>
				<p>
					{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) =>
						liveSessionDetails.sessions[0].recurrencePattern.daysOfWeek?.includes(
							index
						)
							? `${day} `
							: ""
					)}
				</p>
			</div>
		</>
	);
};

export interface EbookProps {
	pages: number;
	size: string;
	link: string;
}

export const EbooksType = ({ pages, size, link }: EbookProps) => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Pages</h4>
				<p>{pages}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Size</h4>
				<p>{size}</p>
			</div>
		</>
	);
};

export interface TutorialProps {
	duration: string;
	size: string;
	link: string;
}

export const VideosType = ({ duration, size, link }: TutorialProps) => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>{duration}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Size</h4>
				<p>{size}</p>
			</div>
		</>
	);
};

export const AudiosType = ({ duration, size, link }: TutorialProps) => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>{duration}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Size</h4>
				<p>{size}</p>
			</div>
		</>
	);
};
