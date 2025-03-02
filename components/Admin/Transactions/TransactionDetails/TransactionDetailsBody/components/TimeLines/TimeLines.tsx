"use client";
import React, { useState, useEffect } from "react";
import styles from "./TimeLines.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { CheckmarkIcon } from "@/shared/svgs/dashboard";
import { useSearchParams } from "next/navigation";
import { saleBuyersTimeline, saleBuyersTimelineThirdParty } from "../utils/data";

interface Timeline {
	id: number;
	name: string;
}
interface Props {
	timelines?: any;
}

const DetailsTimeline = ({ timelines }: Props) => {
	const [steps, setSteps] = useState(1);
	const [newTimelines, setNewTimelines] = useState<Timeline[]>([]);
	const search = useSearchParams();
	const thirdPartyVerification = search.get("third_party");

	const handlePrev = () => {
		if (steps > 1) {
			setSteps(steps - 1);
		}
	};

	const handleNext = () => {
		if (steps < newTimelines.length) {
			setSteps(steps + 1);
		}
	};

	useEffect(() => {
		if (thirdPartyVerification) {
			setNewTimelines(saleBuyersTimelineThirdParty);
		} else {
			setNewTimelines(saleBuyersTimeline);
		}
	}, [thirdPartyVerification]);

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<HeaderSubText title="Transaction timeline" />
				<ul className={styles.timelines_container}>
					{newTimelines?.map((timeline: any) => {
						return (
							<li key={timeline.id} className={styles.timeline_container}>
								<div key={timeline.id} className={styles.timeline}>
									<div className={styles.span_container}>
										<span
											className={styles.id_container}
											data-active={timeline.id <= steps}
										>
											{steps - 1 < timeline.id ? (
												timeline.id
											) : (
												<span
													className={styles.check_icon}
													data-active={timeline.id <= steps}
												>
													<CheckmarkIcon color="#fff" />
												</span>
											)}
										</span>
										{timeline.id < newTimelines.length && (
											<div
												data-active={timeline.id <= steps - 1}
												className={styles.line_icon}
											></div>
										)}
									</div>
									<p data-active={timeline.id <= steps}>
										{timeline.name}
									</p>
								</div>
								<p className={styles.date_text}>15 Dec, 2023 8:30 Am</p>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default DetailsTimeline;
