"use client";

import { NewCourseListingsNav } from "@/components/UserDashboard/Listings/NewCourseListings/components";
import React, { useState } from "react";
import styles from "./CourseListingView.module.scss";
import { useRouter } from "next/navigation";
import { HeaderSubText } from "@/components/UserDashboard";
import { Button, CustomTextEditor } from "@/shared";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { useUploadFiles } from "@/app/api/hooks/listings";
import toast from "react-hot-toast";
import { usePostCreateCourse, usePostUpdateCourse } from "@/app/api/hooks/courses";
import { clearNewCourse, Course, updateNewCourse } from "@/store/slices/addCourseSlice";

interface ContentDetailsFormValues {
	author: string;
	content?: {
		tableOfContent: string;
		whatYouWillLearn: string;
	};
	cover: string;
}

const CourseSummaryView = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { mutateAsync: postUploadFile, isPending: uploadingImgs } = useUploadFiles();
	const { mutateAsync: createCourseListing, isPending } = usePostCreateCourse();
	const { mutateAsync: updateCourseListing, isPending: isPendingUpdate } =
		usePostUpdateCourse();
	const newCourse = useAppSelector(s => s.newCourse);
	const user = useAppSelector(s => s.user);
	const verificationSteps = ["Course Details", "Course Content"];
	const [tableOfContent, setTableOfContent] = useState<string>(
		newCourse.content?.tableOfContent || ""
	);
	const [whatYouWillLearn, setWhatYouWillLearn] = useState<string>(
		newCourse.content?.whatYouWillLearn || ""
	);

	const onClose = () => {
		router.push("/user/dashboard");
	};

	const handleSubmission = async () => {
		if (!user?.userId || !user.isAuthenticated) {
			toast.error("Please login to create a product");
			router.push(`/login`);
			return;
		}

		const courseId = newCourse?._id;

		try {
			let cover: string = newCourse.cover;
			if (newCourse.tempPhoto && newCourse.tempPhoto.length > 0) {
				const imgUploadRes = await postUploadFile(newCourse.tempPhoto!);
				cover = imgUploadRes?.imageUrls[0];
			}
			const photos = Array.from(
				new Set([...(newCourse.cover ? [newCourse.cover] : []), cover])
			);
			const newCoursePhotos = photos.filter(url => !url.startsWith("blob:"));

			dispatch(
				updateNewCourse({
					cover: newCoursePhotos[0]
				})
			);
			const data = {
				...newCourse,
				tempPhoto: undefined,
				cover: newCoursePhotos[0],
				content: { whatYouWillLearn, tableOfContent },
				author: user._id
			};

			if (courseId) {
				await updateCourseListing({ ...data, courseId });
			} else {
				await createCourseListing(data);
			}
			toast.success(`Course ${courseId ? "updated" : "created"} successfully`);
			dispatch(clearNewCourse());
			router.push("/user/listings?type=courses");
		} catch (error: any) {
			console.log(error);
			toast.error(
				error?.response?.data?.error ||
					error?.response?.data?.message ||
					`Error ${courseId ? "updating" : "creating"} course`
			);
		}
	};

	const isDisabled = !tableOfContent || !whatYouWillLearn;
	return (
		<div className={styles.container}>
			<NewCourseListingsNav
				stepCount={verificationSteps.length}
				currentStep={2}
				steps={verificationSteps}
				onClose={onClose}
			/>
			<main className={styles.container__main_content}>
				<div className={styles.container__main_content__left_side}>
					<div className={styles.container}>
						<HeaderSubText
							title="Content"
							description="Start putting together your course by creating table of contents and what to learn"
						/>
						<div className={styles.field}>
							<CustomTextEditor
								value={tableOfContent}
								setValue={setTableOfContent}
								label="Table of contents"
								placeholder="Enter your course table of contents here..."
							/>
						</div>
						<div className={styles.field}>
							<CustomTextEditor
								value={whatYouWillLearn}
								setValue={setWhatYouWillLearn}
								label="You’ll learn"
								placeholder="Describe in detail what to expect from your course..."
							/>
						</div>
					</div>
				</div>
				<div className={styles.container__main_content__right_side}>
					<div className={styles.img_container}>
						<Image
							src="/images/laptop-man.png"
							height={600}
							width={600}
							alt="Verification"
						/>
					</div>
				</div>
			</main>
			<div className={styles.button_container} data-page={2}>
				<Button
					onClick={() => router.back()}
					buttonType="secondary"
					className={styles.container__btn_started}
				>
					Back
				</Button>
				<Button
					onClick={handleSubmission}
					buttonType="primary"
					iconSuffix="/svgs/color-arrow.svg"
					className={styles.container__btn_started}
					disabled={isDisabled || uploadingImgs || isPendingUpdate || isPending}
				>
					Publish
				</Button>
			</div>
		</div>
	);
};

export default CourseSummaryView;
