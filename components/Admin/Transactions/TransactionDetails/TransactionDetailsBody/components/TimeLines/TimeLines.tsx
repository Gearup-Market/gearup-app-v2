"use client";
import React, { useState, useEffect } from "react";
import styles from "./TimeLines.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { CheckmarkIcon } from "@/shared/svgs/dashboard";
import { formatDate } from "@/utils";

interface Timeline {
	isCurrent: boolean
	stage: string
	transactionHash: string
	updatedAt: string
	_id: string
}
interface Props {
	timelines?: Timeline[];
	status?: string
}

const DetailsTimeline = ({ timelines, status }: Props) => {

	const getActiveTimelineId = () => {
		const activeTimeline = timelines?.findIndex((timeline) => timeline.isCurrent);
		return activeTimeline ?? -1;
	}

	const removeTextUnderscores = (text: string) => {
		return text.replace(/_/g, " ");
	}

	const isTransactionEnded = status?.toLowerCase() === "completed" || status?.toLowerCase() === "declined"

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<HeaderSubText title="Transaction timeline" />
				<ul className={styles.timelines_container}>
					{timelines?.map((timeline: any, ind) => {
						return (
							<li key={timeline.id} className={styles.timeline_container}>
								<div key={timeline.id} className={styles.timeline}>
									<div className={styles.span_container}>
										<span
											className={styles.id_container}
											data-active={ind < getActiveTimelineId()}
										>
											{getActiveTimelineId() < ind ? (
												timeline.id
											) : (
												<span
													className={styles.check_icon}
													data-active={ind < getActiveTimelineId() || isTransactionEnded}
												>
													<CheckmarkIcon color="#fff" />
												</span>
											)}
										</span>
										{ind + 1 < timelines.length && (
											<div
												data-active={ind < getActiveTimelineId()}
												className={styles.line_icon}
											></div>
										)}
									</div>
									<p data-active={timeline?.isCurrent} className={styles.timeline_stage}>
										{removeTextUnderscores(timeline?.stage)}
									</p>
								</div>
								<p className={styles.date_text}>{formatDate(timeline?.updatedAt)}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default DetailsTimeline;
