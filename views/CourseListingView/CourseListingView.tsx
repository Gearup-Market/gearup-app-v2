"use client";
import React, { useRef, useState } from "react";
import styles from "./CourseListingView.module.scss";
import Image from "next/image";
import { Button, CustomRadioButton, CustomTextEditor, InputField } from "@/shared";
import {
	CourseContent,
	CourseDetails,
	NewCourseListingsNav
} from "@/components/UserDashboard/Listings/NewCourseListings/components";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { HeaderSubText } from "@/components/UserDashboard";
import Modal from "@/shared/modals/modal/Modal";
import Calendar from "react-calendar";
import format from "date-fns/format";
import { updateNewCourse } from "@/store/slices/addCourseSlice";

interface ContentDetailsFormValues {
	title: string;
	subtitle: string;
	description: string;
	courseType: string;
	price: number;
	link: string;
	liveTutorials?: {
		startDate: Date;
		endDate: Date;
	};
	ebooks?: {
		pages: number;
		size: string;
	};
	videoTutorials?: {
		duration: string;
		size: string;
	};
	audioTutorials?: {
		duration: string;
		size: string;
	};
	tempPhoto?: File[];
	cover?: string;
}

export enum CourseType {
	Ebook = "Ebooks",
	Video = "Video Tutorials",
	Audio = "Audio Tutorials",
	Live = "Live Tutorials"
}

export const courseTypes = [
	{ label: CourseType.Ebook, value: CourseType.Ebook },
	{ label: CourseType.Video, value: CourseType.Video },
	{ label: CourseType.Audio, value: CourseType.Audio },
	{ label: CourseType.Live, value: CourseType.Live }
];

interface SelectedDate {
	startDate?: Date;
	endDate?: Date;
}

const CourseListingView = () => {
	const router = useRouter();
	const onClose = () => {
		router.push("/user/dashboard");
	};

	const verificationSteps = ["Course Details", "Course Content"];

	const newCourse = useAppSelector(s => s.newCourse);
	const user = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const inputUploadRef = useRef<HTMLInputElement>(null);

	const initialValues: ContentDetailsFormValues = {
		title: newCourse.title || "",
		subtitle: newCourse.subtitle || "",
		description: newCourse.description || "",
		courseType: newCourse.courseType || "",
		link: newCourse.link || "",
		price: newCourse.price || 0,
		tempPhoto: newCourse.tempPhoto || [],
		cover: newCourse.cover || ""
		// liveTutorials: newCourse.liveTutorials || undefined,
		// ebooks: newCourse.ebooks || undefined,
		// videoTutorials: newCourse.videoTutorials || undefined,
		// audioTutorials: newCourse.audioTutorials || undefined
	};
	const [inputValues, setInputValues] =
		useState<ContentDetailsFormValues>(initialValues);
	const [liveTutorials, setLiveTutorials] = useState<SelectedDate>({
		startDate: newCourse.liveTutorials?.startDate || undefined,
		endDate: newCourse.liveTutorials?.endDate || undefined
	});
	const [ebooks, setEbooks] = useState<{ pages: number; size: string }>({
		pages: newCourse.ebooks?.pages || 0,
		size: newCourse.ebooks?.size || ""
	});

	const [tutorials, setTutorials] = useState<{
		duration: string;
		size: string;
	}>({
		duration:
			newCourse.videoTutorials?.duration ||
			newCourse.audioTutorials?.duration ||
			"",
		size: newCourse.videoTutorials?.size || newCourse.audioTutorials?.size || ""
	});

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Title is required"),
		subtitle: Yup.string().required("Subtitle is required"),
		description: Yup.string().required("Description is required"),
		courseType: Yup.string().required("Course type is required"),
		price: Yup.number().required("Price is required"),
		duration: Yup.string()
			.oneOf([CourseType.Video], "Duration is required")
			.required(),
		size: Yup.string()
			.oneOf([CourseType.Ebook, CourseType.Video], "Size is required")
			.required(),
		pages: Yup.string().oneOf([CourseType.Ebook], "Page is required").required(),
		liveVideo: Yup.string().oneOf([CourseType.Live], "Page is required").required()
	});

	const handleSubmit = () => {
		dispatch(
			updateNewCourse({
				...inputValues,
				...(inputValues.courseType === CourseType.Ebook && { ebooks }),
				...(inputValues.courseType === CourseType.Video && {
					videoTutorials: tutorials
				}),
				...(inputValues.courseType === CourseType.Audio && {
					audioTutorials: tutorials
				}),
				...(inputValues.courseType === CourseType.Live && {
					liveTutorials: {
						startDate: liveTutorials.startDate || new Date(),
						endDate: liveTutorials.endDate || new Date()
					}
				})
			})
		);
		router.push("/course-listing/course-summary");
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			setSelectedImage(file);
			setInputValues(prev => ({ ...prev, tempPhoto: [file] }));
		}
	};

	const openUploadDialog = () => {
		inputUploadRef.current?.click();
	};

	const selectDate = (date: Date, type: "startDate" | "endDate") => {
		setLiveTutorials({ [type]: date });
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValues(prev => ({ ...prev, [name]: value }));
	};

	const clearTypeOptions = () => {
		setEbooks({ pages: 0, size: "" });
		setTutorials({ duration: "", size: "" });
		setLiveTutorials({ startDate: undefined, endDate: undefined });
	};

	const isDisabled = !(
		inputValues.title &&
		inputValues.subtitle &&
		inputValues.description &&
		inputValues.courseType &&
		inputValues.price &&
		(inputValues.courseType === CourseType.Video
			? !!tutorials.duration && !!tutorials.size
			: true) &&
		(inputValues.courseType === CourseType.Ebook
			? !!ebooks.pages && !!ebooks.size
			: true) &&
		(inputValues.courseType === CourseType.Audio
			? !!tutorials.duration && !!tutorials.size
			: true)
	);

	return (
		<div className={styles.container}>
			<NewCourseListingsNav
				stepCount={verificationSteps.length}
				currentStep={1}
				steps={verificationSteps}
				onClose={onClose}
			/>
			<main className={styles.container__main_content}>
				<div className={styles.container__main_content__left_side}>
					<div className={styles.details}>
						<HeaderSubText
							title="Course details"
							description="Add a new course by entering course details"
						/>
						<div className={styles.details__form_container}>
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={handleSubmit}
							>
								{({
									errors,
									touched,
									values,
									setFieldValue,
									resetForm,
									isSubmitting
								}) => (
									<Form>
										<div
											className={
												styles.details__form_container__form
											}
										>
											<div className={styles.field}>
												<Field name="title">
													{({ field }: FieldProps) => (
														<InputField
															{...field}
															label="Title"
															placeholder="Enter course title"
															name="title"
															onChange={e => {
																field.onChange(e);
																handleOnChange(e);
															}}
															error={
																touched.title &&
																errors.title
															}
														/>
													)}
												</Field>
											</div>

											<div className={styles.field}>
												<Field name="subtitle">
													{({ field }: FieldProps) => (
														<InputField
															{...field}
															label="Subtitle"
															name="subtitle"
															placeholder="E.g From beginner to pro"
															onChange={e => {
																field.onChange(e);
																handleOnChange(e);
															}}
															error={
																touched.subtitle &&
																errors.subtitle
															}
														/>
													)}
												</Field>
											</div>
											<div className={styles.field}>
												<CustomTextEditor
													value={values.description}
													setValue={e => {
														setFieldValue("description", e);
														handleOnChange({
															target: {
																name: "description",
																value: e
															}
														} as React.ChangeEvent<HTMLInputElement>);
													}}
													label="Description"
													placeholder="Enter your course description here..."
												/>
											</div>
											<div>
												<h2 className={styles.banner_title}>
													Cover
												</h2>
												<div className={styles.image_container}>
													<input
														id="fileInput"
														type="file"
														accept=".jpeg, .jpg, .png, .gif"
														ref={inputUploadRef}
														style={{ display: "none" }}
														onChange={handleImageChange}
													/>
													{selectedImage ||
													inputValues.cover ? (
														<div
															className={
																styles.image_wrapper
															}
														>
															<Image
																src={
																	inputValues.cover ||
																	URL.createObjectURL(
																		selectedImage as File
																	)
																}
																alt="image"
																fill
																className={styles.image}
															/>
														</div>
													) : (
														<div
															className={
																styles.image_placeholder
															}
														>
															<Image
																src="/svgs/icon-image.svg"
																height={30}
																width={30}
																alt="image-icon"
																onClick={openUploadDialog}
																style={{
																	cursor: "pointer"
																}}
															/>
															<p>
																Drop your image here, or{" "}
																<label
																	onClick={
																		openUploadDialog
																	}
																	className={
																		styles.click_to_upload_text
																	}
																>
																	click to upload{" "}
																</label>
															</p>
															<p>
																Images should be
																horizontal, at least
																1280x720px, and 72 DPI
																(dots per inch).
															</p>
														</div>
													)}
												</div>
												{(selectedImage || newCourse.cover) && (
													<Button
														onClick={openUploadDialog}
														buttonType="secondary"
														type="submit"
													>
														Change image
													</Button>
												)}
											</div>
											<div>
												<h2 className={styles.title}>
													Course type
												</h2>
												<ul className={styles.flex_fields}>
													{courseTypes.map(
														(courseType, index) => (
															<CustomRadioButton
																key={index}
																name="courseType"
																label={courseType.label
																	.split("_")
																	.join(" ")}
																value={courseType.value}
																addPadding={false}
																checked={
																	values.courseType ===
																	courseType.value
																}
																onChange={() => {
																	setFieldValue(
																		"courseType",
																		courseType.value
																	);
																	setInputValues(
																		prev => ({
																			...prev,
																			courseType:
																				courseType.value
																		})
																	);
																	clearTypeOptions;
																}}
															/>
														)
													)}
												</ul>
												{errors.courseType &&
													touched.courseType && (
														<div className={styles.error}>
															{errors.courseType}
														</div>
													)}
											</div>
											<div className={styles.field}>
												<Field name="link">
													{({ field }: FieldProps) => (
														<InputField
															{...field}
															label="link"
															name="link"
															placeholder="E.g notion, google drive etc"
															description="This link directs users to access the course after purchase or enrollment."
															error={
																touched.link &&
																errors.link
															}
															onChange={e => {
																field.onChange(e);
																handleOnChange(e);
															}}
														/>
													)}
												</Field>
											</div>
											{(values.courseType === CourseType.Video ||
												values.courseType ===
													CourseType.Audio) && (
												<div className={styles.row}>
													<div className={styles.field}>
														<Field name="duration">
															{({ field }: FieldProps) => (
																<InputField
																	{...field}
																	label="Duration"
																	placeholder="E.g 20 mins"
																	value={
																		tutorials.duration
																	}
																	onChange={e => {
																		field.onChange(e);
																		setTutorials(
																			prev => ({
																				...prev,
																				duration:
																					e
																						.target
																						.value
																			})
																		);
																	}}
																	// error={
																	// 	touched.duration &&
																	// 	errors.duration
																	// }
																/>
															)}
														</Field>
													</div>
													<div className={styles.field}>
														<Field name="size">
															{({ field }: FieldProps) => (
																<InputField
																	{...field}
																	label="Size"
																	placeholder="Enter file size"
																	value={tutorials.size}
																	onChange={e => {
																		field.onChange(e);
																		setTutorials(
																			prev => ({
																				...prev,
																				size: e
																					.target
																					.value
																			})
																		);
																	}}
																	// error={
																	// 	touched.videoTutorials &&
																	// 	errors.videoTutorials
																	// }
																/>
															)}
														</Field>
													</div>
												</div>
											)}
											{values.courseType === CourseType.Ebook && (
												<div className={styles.row}>
													<div className={styles.field}>
														<Field name="pages">
															{({ field }: FieldProps) => (
																<InputField
																	{...field}
																	label="Pages"
																	placeholder="Enter number of pages "
																	type="number"
																	value={ebooks.pages}
																	onChange={e => {
																		field.onChange(e);
																		setEbooks({
																			...ebooks,
																			pages: parseInt(
																				e.target
																					.value
																			)
																		});
																	}}
																	// error={
																	// 	touched.pages &&
																	// 	errors.pages
																	// }
																/>
															)}
														</Field>
													</div>
													<div className={styles.field}>
														<Field name="size">
															{({ field }: FieldProps) => (
																<InputField
																	{...field}
																	label="Size"
																	placeholder="Enter file size"
																	value={ebooks.size}
																	onChange={e => {
																		field.onChange(e);
																		setEbooks(
																			prev => ({
																				...prev,
																				size: e
																					.target
																					.value
																			})
																		);
																	}}
																	// error={
																	// 	touched.size &&
																	// 	errors.size
																	// }
																/>
															)}
														</Field>
													</div>
												</div>
											)}
											{values.courseType === CourseType.Live && (
												<div className={styles.row}>
													<DateContainer
														label="Start date"
														selectDate={selectDate}
														type="startDate"
														date={liveTutorials.startDate}
													/>
													<DateContainer
														label="End date"
														selectDate={selectDate}
														type="endDate"
														date={liveTutorials.endDate}
													/>
												</div>
											)}
											<div className={styles.field}>
												<Field name="price">
													{({ field }: FieldProps) => (
														<InputField
															{...field}
															label="Price"
															name="price"
															placeholder="Enter price"
															type="number"
															min={0}
															onChange={e => {
																field.onChange(e);
																handleOnChange(e);
															}}
															error={
																touched.price &&
																errors.price
															}
														/>
													)}
												</Field>
											</div>
										</div>
									</Form>
								)}
							</Formik>
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
			<div className={styles.button_container} data-page={1}>
				<Button
					onClick={handleSubmit}
					buttonType="primary"
					iconSuffix="/svgs/color-arrow.svg"
					className={styles.container__btn_started}
					disabled={isDisabled}
				>
					Save & Continue
				</Button>
			</div>
		</div>
	);
};

export default CourseListingView;

interface DateProps {
	selectDate: (date: Date, type: "startDate" | "endDate") => void;
	date?: Date;
	type: "startDate" | "endDate";
	label: string;
}

const DateContainer = ({ selectDate, date, type, label }: DateProps) => {
	const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);
	// const [inputDate, setInputDate] = useState<any>();
	return (
		<div className={styles.input_container}>
			<label htmlFor="">{label}</label>
			<div className={styles.input_field} onClick={() => setOpenModal(true)}>
				<div className={styles.icon}>
					<Image src="/svgs/calendar.svg" fill alt="" sizes="100vw" />
				</div>
				<div className={styles.text}>
					<p>
						{isDateSelected
							? `${format(date || new Date(), "MM/dd/yyyy")}`
							: `Select a date`}
					</p>
				</div>
			</div>
			{openModal && (
				<DatePicker
					openModal={openModal}
					setOpenModal={setOpenModal}
					inputDate={date}
					selectDate={selectDate}
					setIsDateSelected={setIsDateSelected}
					type={type}
				/>
			)}
		</div>
	);
};

interface CalendarProps {
	setOpenModal: (e?: any) => void;
	selectDate: (date: Date, type: "startDate" | "endDate") => void;
	openModal: boolean;
	inputDate: any;
	setIsDateSelected: (e?: any) => void;
	type: "startDate" | "endDate";
}

const DatePicker = ({
	setOpenModal,
	selectDate,
	openModal,
	inputDate,
	setIsDateSelected,
	type
}: CalendarProps) => {
	const onDateChange = (newDate: any) => {
		selectDate(newDate, type);
		setOpenModal(false);
		setIsDateSelected(true);
	};
	return (
		<Modal
			openModal={openModal}
			setOpenModal={setOpenModal}
			title="Choose date"
			className={styles.modal}
		>
			<div
				className={styles.calendar_container}
				onClick={e => {
					e.nativeEvent.stopImmediatePropagation();
					e.stopPropagation();
				}}
			>
				<Calendar
					onChange={onDateChange}
					value={inputDate}
					minDate={new Date()}
					className={styles.calender}
					prev2Label={null}
					next2Label={null}
				/>
			</div>
		</Modal>
	);
};
