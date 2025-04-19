"use client";

import React, { useState } from "react";
import styles from "./BuyCourseDetails.module.scss";
import { ImageSlider } from "@/components/listing";
import { Course } from "@/store/slices/coursesSlice";
import { getExplorerUrl } from "@/utils/stellar";
import { copyText, formatNum, shortenTitle } from "@/utils";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { Button, DetailContainer, InputField } from "@/shared";
import { CourseType } from "@/views/CourseListingView/CourseListingView";
import { useCopy } from "@/hooks";
import format from "date-fns/format";
import { DescriptionCard } from "@/components/courses";
import { usePostUpdateCourse } from "@/app/api/hooks/courses";
import { useAppSelector } from "@/store/configureStore";
import toast from "react-hot-toast";
import Modal from "@/shared/modals/modal/Modal";

const BuyCourseDetails = ({
	course,
	refetch
}: {
	course: Course;
	refetch: (e?: any) => void;
}) => {
	const user = useAppSelector(s => s.user);
	const { mutateAsync: updateCourseListing, isPending: isPendingUpdate } =
		usePostUpdateCourse();
	const [link, setLink] = useState<string>(course?.link || "");
	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleEditLink = async () => {
		try {
			const data = {
				...course,
				link
			};

			await updateCourseListing({ ...data, courseId: course?._id });
			toast.success(`Link updated successfully`);
			setOpenModal(false);
			refetch();
		} catch (error: any) {
			console.log(error);
			toast.error(error?.response?.data?.message || `Error "updating" course`);
		}
	};
	return (
		<div className={styles.section}>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.container}>
						<ImageSlider images={[course?.cover]} type={course?.courseType} />
						<div className={styles.block}>
							<div className={styles.text}>
								<h2>{course?.title}</h2>
							</div>
							{course?.courseType === CourseType.Live && (
								<LiveCourse
									setOpenModal={setOpenModal}
									link={course?.link}
									startDate={
										course?.liveSessionDetails?.dateRange
											.startDate as Date
									}
									endDate={
										course?.liveSessionDetails?.dateRange
											.endDate as Date
									}
								/>
							)}
							{course?.courseType === CourseType.Ebook && (
								<EbooksType
									setOpenModal={setOpenModal}
									link={course?.link}
									pages={course?.ebooks?.pages || 0}
									size={course?.ebooks?.size || ""}
								/>
							)}
							{course?.courseType === CourseType.Video && (
								<VideosType
									setOpenModal={setOpenModal}
									link={course?.link}
									duration={course?.videoTutorials?.duration || ""}
									size={course?.videoTutorials?.size || ""}
								/>
							)}
							{course?.courseType === CourseType.Audio && (
								<AudiosType
									setOpenModal={setOpenModal}
									link={course?.link}
									duration={course?.audioTutorials?.duration || ""}
									size={course?.audioTutorials?.size || ""}
								/>
							)}
							<DescriptionCard
								className={styles.description_container}
								description={course?.description}
								title="Description"
							/>
							<div className={styles.divider}></div>
							<HeaderSubText title="PRICING" />
							<DetailContainer
								title="Amount"
								value={course?.price}
								prefix="₦"
							/>
							<div className={styles.divider}></div>
						</div>
					</div>

					{/* <HeaderSubText title="Blockchain information" />
					<div className={styles.blockchain_info_container}>
						{listing?.transactionId ? (
							<>
								<div className={styles.blockchain_label_container}>
									<p className={styles.view_explorer_title}>
										Transaction ID
									</p>
									<Link
										href={getExplorerUrl(
											`txns/${listing.transactionId}`
										)}
										target="_blank"
										className={styles.view_explorer}
									>
										View explorer
									</Link>
								</div>
								<div className={styles.blockchain_number_container}>
									<p className={styles.blockchain_number}>
										{listing.transactionId}
									</p>
									<p className={styles.blockchain_copy_icon}>
										<Image
											src="/svgs/copy.svg"
											alt="copy-icon"
											width={10}
											height={10}
											onClick={() =>
												copyText(listing?.transactionId ?? "")
											}
										/>
									</p>
								</div>
							</>
						) : null}
						{listing?.nftTokenId ? (
							<div className={styles.blockchain_token_container}>
								<p className={styles.token_id_title}>Token ID</p>
								<p className={styles.token_id}>{listing?.nftTokenId}</p>
							</div>
						) : null}
					</div> */}
					<div></div>
				</div>
			</div>
			{openModal && (
				<EditModal
					openModal={openModal}
					setOpenModal={setOpenModal}
					handleSubmit={handleEditLink}
					setLink={setLink}
					link={link}
					isPending={isPendingUpdate}
				/>
			)}
		</div>
	);
};

export default BuyCourseDetails;

export interface LiveProps {
	startDate: Date;
	endDate: Date;
	setOpenModal?: (e?: any) => void;
	link: string;
}

export const LiveCourse = ({ startDate, endDate, setOpenModal, link }: LiveProps) => {
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
			{setOpenModal && (
				<div className={styles.summary_item}>
					<h4>Meeting link</h4>
					<span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<p className={styles.truncated_text}>{shortenTitle(link, 20)}</p>
						<span className={styles.edit} onClick={() => setOpenModal(true)}>
							Edit
						</span>
					</span>
				</div>
			)}
		</>
	);
};

export interface EbookProps {
	pages: number;
	size: string;
	setOpenModal?: (e?: any) => void;
	link: string;
}

export const EbooksType = ({ pages, size, setOpenModal, link }: EbookProps) => {
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
			{setOpenModal && (
				<div className={styles.summary_item}>
					<h4>Link to course</h4>
					<span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<p className={styles.truncated_text}>{shortenTitle(link, 20)}</p>
						<span className={styles.edit} onClick={() => setOpenModal(true)}>
							Edit
						</span>
					</span>
				</div>
			)}
		</>
	);
};

export interface TutorialProps {
	duration: string;
	size: string;
	setOpenModal?: (e?: any) => void;
	link: string;
}

export const VideosType = ({ duration, size, setOpenModal, link }: TutorialProps) => {
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
			{setOpenModal && (
				<div className={styles.summary_item}>
					<h4>Link to course</h4>
					<span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
						<p className={styles.truncated_text}>{shortenTitle(link, 20)}</p>
						<span className={styles.edit} onClick={() => setOpenModal(true)}>
							Edit
						</span>
					</span>
				</div>
			)}
		</>
	);
};

export const AudiosType = ({ duration, size, setOpenModal, link }: TutorialProps) => {
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
			{setOpenModal && (
				<div className={styles.summary_item}>
					<h4>Link to course</h4>
					<span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
						<p className={styles.truncated_text}>{shortenTitle(link, 20)}</p>
						<span className={styles.edit} onClick={() => setOpenModal(true)}>
							Edit
						</span>
					</span>
				</div>
			)}
		</>
	);
};

interface ModalProps {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	disabled?: boolean;
	handleSubmit: (e?: any) => void;
	isPending: boolean;
	link: string;
	setLink: (e?: any) => void;
}

const EditModal = ({
	openModal,
	setOpenModal,
	handleSubmit,
	disabled,
	isPending,
	link,
	setLink
}: ModalProps) => {
	const onClose = () => {
		setOpenModal(false);
	};
	return (
		<Modal title="Edit Link" openModal={openModal} setOpenModal={onClose}>
			<div className={styles.modal}>
				<div className={styles.modal__form_container}>
					<div className={styles.form_field}>
						<InputField
							name="link"
							placeholder="Enter new Link"
							value={link}
							label="Link"
							onChange={e => setLink(e.target.value)}
						/>
					</div>

					<div className={styles.submit_btn_container}>
						<Button
							buttonType="primary"
							onClick={handleSubmit}
							disabled={isPending || disabled}
						>
							{isPending ? "Processing..." : "Save Changes"}
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};
