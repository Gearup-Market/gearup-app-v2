"use client";

import React, { useState } from "react";
import styles from "./CourseListingDetails.module.scss";
import Image from "next/image";
import { CustomImage } from "@/shared";
import { CopyIcon } from "@/shared/svgs/dashboard";
import Link from "next/link";
import { formatNum, getIdFromSlug, shortenTitle } from "@/utils";
import { useDeleteCourse, useGetCourseById } from "@/app/api/hooks/courses";
import { useParams, useRouter } from "next/navigation";
import { PageLoader } from "@/shared/loaders";
import ConfirmPin from "@/components/UserDashboard/Settings/components/confirmPin/ConfirmPin";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateNewCourse } from "@/store/slices/addCourseSlice";
import { CourseType } from "@/views/CourseListingView/CourseListingView";
import format from "date-fns/format";
import { useCopy } from "@/hooks";

const CourseListingDetails = () => {
	const { userId } = useAppSelector(s => s.user);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { listingId } = useParams();
	const handleCopy = useCopy();
	const courseId = getIdFromSlug(listingId.toString());
	const { isFetching, data: courseData } = useGetCourseById(courseId);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const { mutateAsync: postRemoveCourse, isPending: isPendingCourseRemoval } =
		useDeleteCourse();
	const course = courseData?.data;

	const onDeleteCourse = async () => {
		try {
			const payload = { userId, courseId: course?._id };
			const res = await postRemoveCourse(payload);
			if (res.data) {
				toast.success("course deleted");
			}
		} catch (error) {}
	};

	const onClickEdit = () => {
		const payload = {
			...course,
			tempPhoto: []
		};

		dispatch(updateNewCourse(payload));
		router.push(`/course-listing?id=${course?._id}`);
	};

	return (
		<div className={styles.container}>
			{isFetching ? (
				<PageLoader />
			) : (
				<div className={styles.header}>
					<div className={styles.item_details}>
						<div className={styles.left}>
							<Image
								src={course?.cover || ""}
								alt="image-item"
								width={16}
								height={16}
							/>
							<span className={styles.right}>
								<h2>{course?.title}</h2>
								<p>₦{formatNum(course?.price || 0)}</p>
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
						<div className={styles.btns_text_wrapper} onClick={onClickEdit}>
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
						<div
							className={styles.btns_text_wrapper}
							onClick={() => setOpenModal(true)}
						>
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
			)}
			<div className={styles.card_container}>
				<CardContainer title="Sold" value={75} icon="/svgs/sold-icon.svg" />
				<CardContainer
					title="Revenue"
					value={`₦200.00`}
					icon="/svgs/revenue-icon.svg"
				/>
				<CardContainer title="Rating" value={4.7} icon="/svgs/rating-icon.svg" />
			</div>
			<div className={styles.details_body}>
				<div className={styles.summary_container}>
					<h3 className={styles.title}>Overview</h3>
					{/* conditionally render the type of course */}
					{course?.courseType === CourseType.Live && (
						<LiveCourse
							handleCopy={handleCopy}
							link={course?.link}
							startDate={course?.liveTutorials?.startDate as Date}
							endDate={course?.liveTutorials?.endDate as Date}
						/>
					)}
					{course?.courseType === CourseType.Ebook && (
						<EbooksType
							handleCopy={handleCopy}
							link={course?.link}
							pages={course?.ebooks?.pages || 0}
							size={course?.ebooks?.size || ""}
						/>
					)}
					{course?.courseType === CourseType.Video && (
						<VideosType
							handleCopy={handleCopy}
							link={course?.link}
							duration={course?.videoTutorials?.duration || ""}
							size={course?.videoTutorials?.size || ""}
						/>
					)}
					{course?.courseType === CourseType.Audio && (
						<AudiosType
							handleCopy={handleCopy}
							link={course?.link}
							duration={course?.audioTutorials?.duration || ""}
							size={course?.audioTutorials?.size || ""}
						/>
					)}
				</div>

				<EnrolledLearners />
			</div>
			{openModal && (
				<ConfirmPin
					openModal={openModal}
					setOpenModal={setOpenModal}
					onSuccess={onDeleteCourse}
				/>
			)}
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

interface LiveProps {
	startDate: Date;
	endDate: Date;
	handleCopy: (e?: any) => void;
	link: string;
}

export const LiveCourse = ({ startDate, endDate, handleCopy, link }: LiveProps) => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Course type</h4>
				<p>Live Tutorials</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>2 months</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Starts</h4>
				<p>{format(startDate, "MM/dd/yyyy")}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Ends</h4>
				<p>{format(endDate, "MM/dd/yyyy")}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Daily hours</h4>
				<p>10 hours</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Meeting link</h4>
				<span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<p className={styles.truncated_text}>{shortenTitle(link, 30)}</p>
					<span className={styles.icon} onClick={() => handleCopy(link)}>
						<CopyIcon />
					</span>
				</span>
			</div>
		</>
	);
};

interface EbookProps {
	pages: number;
	size: string;
	handleCopy: (e?: any) => void;
	link: string;
}

export const EbooksType = ({ pages, size, handleCopy, link }: EbookProps) => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Course type</h4>
				<p>Ebook</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Pages</h4>
				<p>{pages}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Size</h4>
				<p>{size}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Link to course</h4>
				<span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<p className={styles.truncated_text}>{shortenTitle(link, 30)}</p>
					<span className={styles.icon} onClick={() => handleCopy(link)}>
						<CopyIcon />
					</span>
				</span>
			</div>
		</>
	);
};

interface TutorialProps {
	duration: string;
	size: string;
	handleCopy: (e?: any) => void;
	link: string;
}

export const VideosType = ({ duration, size, handleCopy, link }: TutorialProps) => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Course type</h4>
				<p>Video</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>{duration}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Size</h4>
				<p>{size}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Link to course</h4>
				<span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
					<p className={styles.truncated_text}>{shortenTitle(link, 30)}</p>
					<span className={styles.icon} onClick={() => handleCopy(link)}>
						<CopyIcon />
					</span>
				</span>
			</div>
		</>
	);
};

export const AudiosType = ({ duration, size, handleCopy, link }: TutorialProps) => {
	return (
		<>
			<div className={styles.summary_item}>
				<h4>Course type</h4>
				<p>Audio</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>{duration}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Size</h4>
				<p>{size}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Link to course</h4>
				<span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
					<p className={styles.truncated_text}>{shortenTitle(link, 30)}</p>
					<span className={styles.icon} onClick={() => handleCopy(link)}>
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
