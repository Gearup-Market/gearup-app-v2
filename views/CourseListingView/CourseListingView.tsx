"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./CourseListingView.module.scss";
import Image from "next/image";
import {
	Button,
	CheckBox,
	CustomRadioButton,
	CustomTextEditor,
	InputField,
	Select
} from "@/shared";
import { NewCourseListingsNav } from "@/components/UserDashboard/Listings/NewCourseListings/components";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { HeaderSubText } from "@/components/UserDashboard";
import {
	clearNewCourse,
	Course,
	LiveSessionDetails,
	updateNewCourse
} from "@/store/slices/addCourseSlice";
import { timezones } from "@/mock/hours";
import { generateDurations, generateTimeSlots } from "@/utils/addCourse.util";
import DateContainer from "./DateContainer";
import {
	handleSelectChange,
	handleDayToggle,
	selectDate,
	getInitialLiveSessionDetails
} from "@/utils/addCourse.util";

export enum CourseType {
	Ebook = "ebooks",
	Video = "video-tutorial",
	Audio = "audio-tutorial",
	Live = "live-tutorial"
}

export const courseTypes = [
	{ label: CourseType.Ebook, value: "ebooks" },
	{ label: CourseType.Video, value: "video-tutorial" },
	{ label: CourseType.Audio, value: "audio-tutorial" },
	{ label: CourseType.Live, value: "live-tutorial" }
];

const CourseListingView = () => {
	const router = useRouter();
	const onClose = () => {
		dispatch(clearNewCourse());
		router.push("/user/dashboard");
	};

	const verificationSteps = ["Course Details", "Course Content"];

	const newCourse = useAppSelector(s => s.newCourse);
	const dispatch = useAppDispatch();
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const inputUploadRef = useRef<HTMLInputElement>(null);

	const initialValues: Course = {
		title: newCourse.title || "",
		subtitle: newCourse.subtitle || "",
		description: newCourse.description || "",
		courseType: newCourse.courseType || "",
		link: newCourse.link || "",
		price: newCourse.price || 0,
		tempPhoto: newCourse.tempPhoto || [],
		cover: newCourse.cover || ""
	};
	const [inputValues, setInputValues] = useState<Course>(initialValues);
	const [liveSessionDetails, setLiveSessionDetails] = useState<LiveSessionDetails>({
		dateRange: {
			startDate: newCourse.liveSessionDetails?.dateRange.startDate || new Date(),
			endDate: newCourse.liveSessionDetails?.dateRange.endDate || new Date()
		},
		timeZone: newCourse.liveSessionDetails?.timeZone || "",
		sessionCapacity: newCourse.liveSessionDetails?.sessionCapacity || 0,
		sessions: newCourse.liveSessionDetails?.sessions || []
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
		liveVideo: Yup.string().oneOf([CourseType.Live], "Page is required").required(),
		liveSessionDetails: Yup.object().shape({
			timeZone: Yup.string().required("Time zone is required"),
			sessionCapacity: Yup.number().required("Session capacity is required"),
			sessions: Yup.array()
				.of(
					Yup.object().shape({
						startTime: Yup.string().required("Start time is required"),
						durationMinutes: Yup.number().required("Duration is required"),
						frequency: Yup.string().required("Frequency is required"),
						recurrencePattern: Yup.object().shape({
							type: Yup.string().required(
								"Recurrence pattern type is required"
							),
							daysOfWeek: Yup.array()
								.of(Yup.number())
								.required("Days of week is required"),
							monthlyOption: Yup.string().required(
								"Monthly option is required"
							)
						})
					})
				)
				.required("Sessions are required")
		})
	});

	const handleSubmit = () => {
		const { courseType, ...rest } = inputValues;
		dispatch(
			updateNewCourse({
				...rest,
				courseType: courseType === "ebooks" ? "ebook" : courseType,
				...(courseType === "ebooks" && { ebooks }),
				...(courseType === CourseType.Video && {
					videoTutorials: tutorials
				}),
				...(courseType === CourseType.Audio && {
					audioTutorials: tutorials
				}),
				...(courseType === CourseType.Live && {
					liveSessionDetails
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
		setLiveSessionDetails(prev => ({
			...prev,
			dateRange: {
				...prev.dateRange,
				[type]: date
			}
		}));
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValues(prev => ({ ...prev, [name]: value }));
	};

	const clearTypeOptions = () => {
		setEbooks({ pages: 0, size: "" });
		setTutorials({ duration: "", size: "" });
		setLiveSessionDetails({
			dateRange: {
				startDate: new Date(),
				endDate: new Date()
			},
			timeZone: "",
			sessionCapacity: 0,
			sessions: []
		});
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
			: true) &&
		(inputValues.courseType === CourseType.Live
			? !!liveSessionDetails.timeZone &&
			  !!liveSessionDetails.sessionCapacity &&
			  !!liveSessionDetails.sessions.length
			: true)
	);

	const dailyTypeHandled = useRef(false);

	useEffect(() => {
		if (
			!dailyTypeHandled.current &&
			liveSessionDetails.sessions.length > 0 &&
			liveSessionDetails.sessions[0].recurrencePattern.type === "daily"
		) {
			dailyTypeHandled.current = true;
			setLiveSessionDetails(prev => ({
				...prev,
				sessions: prev.sessions.map(session => ({
					...session,
					recurrencePattern: {
						...session.recurrencePattern,
						daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
					}
				}))
			}));
		}
	}, [liveSessionDetails.sessions]);

	// console.log("live")

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
								}) => {
									return (
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
														value={
															values.description as string
														}
														setValue={e => {
															setFieldValue(
																"description",
																e
															);
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
													<div
														className={styles.image_container}
													>
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
																	className={
																		styles.image
																	}
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
																	onClick={
																		openUploadDialog
																	}
																	style={{
																		cursor: "pointer"
																	}}
																/>
																<p>
																	Drop your image here,
																	or{" "}
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
													{(selectedImage ||
														newCourse.cover) && (
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
																	value={
																		courseType.value
																	}
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
												{(values.courseType ===
													CourseType.Video ||
													values.courseType ===
														CourseType.Audio) && (
													<div className={styles.row}>
														<div className={styles.field}>
															<Field name="duration">
																{({
																	field
																}: FieldProps) => (
																	<InputField
																		{...field}
																		label="Duration"
																		placeholder="E.g 20 mins"
																		value={
																			tutorials.duration
																		}
																		onChange={e => {
																			field.onChange(
																				e
																			);
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
																{({
																	field
																}: FieldProps) => (
																	<InputField
																		{...field}
																		label="Size"
																		placeholder="Enter file size"
																		value={
																			tutorials.size
																		}
																		suffix="MB"
																		onChange={e => {
																			field.onChange(
																				e
																			);
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
												{values.courseType ===
													CourseType.Ebook && (
													<div className={styles.row}>
														<div className={styles.field}>
															<Field name="pages">
																{({
																	field
																}: FieldProps) => (
																	<InputField
																		{...field}
																		label="Pages"
																		placeholder="Enter number of pages "
																		type="number"
																		value={
																			ebooks.pages
																		}
																		onChange={e => {
																			field.onChange(
																				e
																			);
																			setEbooks({
																				...ebooks,
																				pages: parseInt(
																					e
																						.target
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
																{({
																	field
																}: FieldProps) => (
																	<InputField
																		{...field}
																		label="Size"
																		placeholder="Enter file size"
																		value={
																			ebooks.size
																		}
																		suffix="MB"
																		onChange={e => {
																			field.onChange(
																				e
																			);
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
												{values.courseType ===
													CourseType.Live && (
													<>
														<div
															className={
																styles.session_details
															}
														>
															<div
																className={
																	styles.session_title
																}
															>
																<h3>
																	Live Session Details
																</h3>
																<p>Session Schedule</p>
															</div>
															<div
																className={
																	styles.grid_row
																}
															>
																<Select
																	options={generateTimeSlots()}
																	label="Start Time"
																	defaultOption={
																		(liveSessionDetails
																			.sessions
																			.length &&
																			liveSessionDetails
																				.sessions[0]
																				?.startTime) ||
																		"Pick a start time"
																	}
																	onOptionChange={(
																		value: string
																	) =>
																		handleSelectChange(
																			setLiveSessionDetails,
																			"startTime",
																			value
																		)
																	}
																/>

																<Select
																	options={generateDurations()}
																	label="Duration"
																	defaultOption={
																		String(
																			liveSessionDetails
																				.sessions
																				.length &&
																				liveSessionDetails
																					.sessions[0]
																					?.durationMinutes
																		) ||
																		"Pick a duration"
																	}
																	onOptionChange={(
																		value: string
																	) =>
																		handleSelectChange(
																			setLiveSessionDetails,
																			"duration",
																			value
																		)
																	}
																/>

																<Select
																	options={timezones}
																	label="Time Zone"
																	defaultOption={
																		liveSessionDetails.timeZone ||
																		"Pick a time zone"
																	}
																	onOptionChange={(
																		value: string
																	) =>
																		handleSelectChange(
																			setLiveSessionDetails,
																			"timeZone",
																			value
																		)
																	}
																/>

																<Select
																	options={[
																		"Daily",
																		"Weekly",
																		"Twice Weekly",
																		"Monthly"
																	]}
																	label="Frequency"
																	defaultOption={
																		liveSessionDetails
																			.sessions[0]
																			?.frequency ||
																		"Pick a frequency"
																	}
																	onOptionChange={(
																		value: string
																	) =>
																		handleSelectChange(
																			setLiveSessionDetails,
																			"frequency",
																			value
																		)
																	}
																/>

																<Select
																	options={Array.from(
																		{ length: 100 },
																		(_, index) => ({
																			value:
																				index + 1,
																			label: `${
																				index + 1
																			}`
																		})
																	)}
																	label="Session Capacity"
																	defaultOption={
																		String(
																			liveSessionDetails.sessionCapacity
																		) ||
																		"Pick a capacity"
																	}
																	onOptionChange={(
																		value: string
																	) =>
																		handleSelectChange(
																			setLiveSessionDetails,
																			"sessionCapacity",
																			value
																		)
																	}
																/>
																<div
																	className={
																		styles.days_container
																	}
																>
																	<div
																		className={
																			styles.text
																		}
																	>
																		<p>Select Days</p>
																	</div>
																	<div
																		className={
																			styles.days_row
																		}
																	>
																		{[
																			"Mon",
																			"Tue",
																			"Wed",
																			"Thu",
																			"Fri",
																			"Sat",
																			"Sun"
																		].map(
																			(
																				day,
																				index
																			) => {
																				const dayValue =
																					index ===
																					6
																						? 0
																						: index +
																						  1;
																				const isSelected =
																					liveSessionDetails.sessions[0]?.recurrencePattern.daysOfWeek?.includes(
																						dayValue
																					);

																				return (
																					<CheckBox
																						key={
																							index
																						}
																						label={
																							day
																						}
																						className={
																							styles.checkbox
																						}
																						checked={
																							isSelected
																						}
																						onChange={() =>
																							handleDayToggle(
																								setLiveSessionDetails,
																								dayValue
																							)
																						}
																					/>
																				);
																			}
																		)}
																	</div>
																</div>
															</div>
														</div>
														<div className={styles.row}>
															<DateContainer
																label="Start date"
																selectDate={selectDate}
																type="startDate"
																date={
																	liveSessionDetails
																		.dateRange
																		.startDate
																}
															/>
															<DateContainer
																label="End date"
																selectDate={selectDate}
																type="endDate"
																date={
																	liveSessionDetails
																		.dateRange.endDate
																}
															/>
														</div>
													</>
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
									);
								}}
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
