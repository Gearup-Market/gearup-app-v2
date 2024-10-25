import React from "react";
import styles from "./CourseListingDetails.module.scss";
import Image from "next/image";
import { CustomImage } from "@/shared";
import { CopyIcon } from "@/shared/svgs/dashboard";
import Link from "next/link";
import { shortenTitle } from "@/utils";

const CourseListingDetails = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.item_details}>
					<div className={styles.left}>
						<Image
							src="/images/admin-img.jpg"
							alt="image-item"
							width={16}
							height={16}
						/>
						<span className={styles.right}>
							<h2>
								The Complete Cinematography course : From Zero To Expert
							</h2>
							<p>$300</p>
						</span>
					</div>
					<div className={styles.status} data-status={"published"}>
						<p>Published</p>
					</div>
				</div>
				<div className={styles.action_btns}>
					<div className={styles.btns_text_wrapper}>
						<span className={styles.icons_container}>
							<Image
								src="/svgs/share.svg"
								alt="heart"
								width={16}
								height={16}
							/>
						</span>
						<p className={styles.icon_label}>Share</p>
					</div>
					<div className={styles.btns_text_wrapper}>
						<span className={styles.icons_container}>
							<Image
								src="/svgs/edit.svg"
								alt="edit-icon"
								width={16}
								height={16}
							/>
						</span>
						<p className={styles.icon_label}>Edit</p>
					</div>
					<div className={styles.btns_text_wrapper}>
						<span className={styles.icons_container}>
							<Image
								src="/svgs/red-trash.svg"
								alt="trash-icon"
								width={16}
								height={16}
							/>
						</span>
						<p className={styles.icon_label}>Delete</p>
					</div>
				</div>
			</div>
			<div className={styles.card_container}>
				<CardContainer title="Sold" value={75} icon="/svgs/sold-icon.svg" />
				<CardContainer
					title="Revenue"
					value={`$200.00`}
					icon="/svgs/revenue-icon.svg"
				/>
				<CardContainer title="Rating" value={4.7} icon="/svgs/rating-icon.svg" />
			</div>
			<div className={styles.details_body}>
				<div className={styles.summary_container}>
					<h3 className={styles.title}>Overview</h3>
					{/* conditionally render the type of course */}
					<LiveCourse />
					{/* <EbooksType /> */}
					{/* <VideosType /> */}
				</div>

				<EnrolledLearners />
			</div>
		</div>
	);
};

export default CourseListingDetails;

interface CardContainerProps {
	title: string;
	value: number | string;
	icon: string;
}

const CardContainer = ({ title, value, icon }: CardContainerProps) => {
	return (
		<div className={styles.card}>
			<div>
				<CustomImage src={icon} alt="title" width={16} height={16} />
			</div>
			<div>
				<p className={styles.title}>{title}</p>
				<p className={styles.value}>{value}</p>
			</div>
		</div>
	);
};

const EnrolledLearners = () => {
	return (
		<div className={styles.enrolled_container}>
			<h3 className={styles.title}>Enrolled learners</h3>
			{learnersData.map((learner, index) => (
				<div key={learner.id} className={styles.learner_container}>
					<div className={styles.left}>
						<div className={styles.image}>
							<CustomImage
								src={learner.image}
								alt="icon"
								height={40}
								width={40}
							/>
						</div>
						<div>
							<h4 className={styles.name}>{learner.name}</h4>
							<p className={styles.location}>{learner.location}</p>
						</div>
					</div>
					<Link
						href={`/user/settings?q=profile/${learner.id}`}
						className={styles.view_profile}
					>
						View Profile
					</Link>
				</div>
			))}
		</div>
	);
};

const LiveCourse = () => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Course type</h4>
				<p>Live</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>2 months</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Starts</h4>
				<p>16/12/2023</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Ends</h4>
				<p>16/12/2023</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Daily hours</h4>
				<p>10 hours</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Meeting link</h4>
				<span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<p className={styles.truncated_text}>
						{shortenTitle(
							"https://Einsteindesign.notion.site/Alison-s-Oasis-2024-ca9ef8c373b842fe8299e4278052cd90?pvs=4",
							30
						)}
					</p>
					<span className={styles.icon}>
						<CopyIcon />
					</span>
				</span>
			</div>
		</>
	);
};

const EbooksType = () => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Course type</h4>
				<p>Ebook</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Pages</h4>
				<p>300</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Size</h4>
				<p>10 days</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Link to course</h4>
				<span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<p className={styles.truncated_text}>
						{" "}
						{shortenTitle(
							"https://Einsteindesign.notion.site/Alison-s-Oasis-2024-ca9ef8c373b842fe8299e4278052cd90?pvs=4",
							30
						)}
					</p>
					<span className={styles.icon}>
						<CopyIcon />
					</span>
				</span>
			</div>
		</>
	);
};

const VideosType = () => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Course type</h4>
				<p>Video</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>300</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Size</h4>
				<p>10 days</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Link to course</h4>
				<span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
					<p className={styles.truncated_text}>
						{shortenTitle(
							"https://Einsteindesign.notion.site/Alison-s-Oasis-2024-ca9ef8c373b842fe8299e4278052cd90?pvs=4",
							30
						)}
					</p>
					<span className={styles.icon}>
						<CopyIcon />
					</span>
				</span>
			</div>
		</>
	);
};

const learnersData = [
	{
		id: 1,
		name: "John Doe",
		image: "/images/admin-img.jpg",
		location: "Lagos, Nigeria"
	},
	{
		id: 1,
		name: "John Doe",
		image: "/images/admin-img.jpg",
		location: "Lagos, Nigeria"
	},
	{
		id: 1,
		name: "John Doe",
		image: "/images/admin-img.jpg",
		location: "Lagos, Nigeria"
	},
	{
		id: 1,
		name: "John Doe",
		image: "/images/admin-img.jpg",
		location: "Lagos, Nigeria"
	},
	{
		id: 1,
		name: "John Doe",
		image: "/images/admin-img.jpg",
		location: "Lagos, Nigeria"
	},
	{
		id: 1,
		name: "John Doe",
		image: "/images/admin-img.jpg",
		location: "Lagos, Nigeria"
	}
];
