"use client";

import React, { useState } from "react";
import styles from "./BuyCourseHeader.module.scss";
import { useDeleteCourse } from "@/app/api/hooks/courses";
import { Course } from "@/store/slices/coursesSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import toast from "react-hot-toast";
import { updateNewCourse } from "@/store/slices/addCourseSlice";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { Button, ToggleSwitch } from "@/shared";
import ConfirmPin from "@/components/UserDashboard/Settings/components/confirmPin/ConfirmPin";

const BuyCourseHeader = ({ course }: { course: Course }) => {
	const { userId } = useAppSelector(s => s.user);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const { mutateAsync: postRemoveCourse, isPending: isPendingCourseRemoval } =
		useDeleteCourse();
	// const course = courseData?.data;

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
			<div className={styles.header}>
				<HeaderSubText title="Details" />
				<div className={styles.toggle_container_mobile}>
					<ToggleListing
						checked={status === "unavailable"}
						// onChange={onToggleHideListing}
						// disabled={isPendingUpdate}
					/>
				</div>
			</div>
			<div className={styles.actions_btns}>
				<div className={styles.toggle_container_desktop}>
					<ToggleListing
						checked={status === "unavailable"}
						// onChange={onToggleHideListing}
						// disabled={isPendingUpdate}
					/>
				</div>
				<div className={styles.btns}>
					<Button
						iconPrefix="/svgs/trash.svg"
						buttonType="transparent"
						className={styles.delete_btn}
						onClick={() => setOpenModal(true)}
						disabled={isPendingCourseRemoval}
					>
						Delete
					</Button>
					<Button iconPrefix="/svgs/edit.svg" onClick={onClickEdit}>
						Edit
					</Button>
				</div>
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

export default BuyCourseHeader;

type ToggleProps = {
	checked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
};
const ToggleListing = ({ checked, onChange, disabled }: ToggleProps) => {
	return (
		<>
			<p>Hide listing</p>
			<ToggleSwitch checked={checked} onChange={onChange} disabled={disabled} />
		</>
	);
};
