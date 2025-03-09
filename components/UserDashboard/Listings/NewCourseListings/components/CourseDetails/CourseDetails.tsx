// components/PayoutForm.tsx
import React, { useRef, useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./CourseDetails.module.scss";
import {
	Button,
	CustomRadioButton,
	CustomTextEditor,
	InputField,
	Select,
	TextArea
} from "@/shared";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import Image from "next/image";
import format from "date-fns/format";
import Modal from "@/shared/modals/modal/Modal";
import Calendar from "react-calendar";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateNewCourse } from "@/store/slices/addCourseSlice";

interface ContentDetailsFormValues {
	title: string;
	subtitle: string;
	description: string;
	courseType: string;
	duration?: string;
	size?: string;
	price: string;
	link: string;
	pages?: number;
	liveTutorials?: SelectedDate;
}

enum CourseType {
	Ebook = "Ebook/PDF",
	Video = "Video tutorial",
	Audio = "Audio tutorial",
	Live = "Live tutorial"
}

const courseTypes = [
	{ label: CourseType.Ebook, value: CourseType.Ebook },
	{ label: CourseType.Video, value: CourseType.Video },
	{ label: CourseType.Audio, value: CourseType.Audio },
	{ label: CourseType.Live, value: CourseType.Live }
];

interface SelectedDate {
	startDate?: Date;
	endDate?: Date;
}

const CourseDetails: React.FC = () => {
	const newCourse = useAppSelector(s => s.newCourse);
	const user = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [date, setDate] = useState<SelectedDate>({
		startDate: new Date(),
		endDate: new Date()
	});
	const inputUploadRef = useRef<HTMLInputElement>(null);
	const initialValues: ContentDetailsFormValues = {
		title: "",
		subtitle: "",
		description: "",
		courseType: "",
		duration: undefined,
		size: undefined,
		price: "",
		link: "",
		pages: undefined,
		liveTutorials: undefined
	};

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

	const handleSubmit = (values: ContentDetailsFormValues) => {
		// Handle form submission
		console.log(values);
		// dispatch(updateNewCourse(values));
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			setSelectedImage(file);
		}
	};

	const openUploadDialog = () => {
		inputUploadRef.current?.click();
	};

	const selectDate = (date: Date, type: "startDate" | "endDate") => {
		setDate({ [type]: date });
	};

	return (
		<div className={styles.container}>
			<HeaderSubText
				title="Course details"
				description="Add a new course by entering course details"
			/>
			<div className={styles.container__form_container}>
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
							<div className={styles.container__form_container__form}>
								<div className={styles.field}>
									<Field name="title">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Title"
												placeholder="Enter course title"
												name="title"
												error={touched.title && errors.title}
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
												placeholder="E.g From beginner to pro"
												error={
													touched.subtitle && errors.subtitle
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.field}>
									<CustomTextEditor
										value={values.description}
										setValue={e => setFieldValue("description", e)}
										label="Description"
										placeholder="Enter your course description here..."
									/>
								</div>
								<div>
									<h2 className={styles.banner_title}>Cover</h2>
									<div className={styles.image_container}>
										<input
											id="fileInput"
											type="file"
											accept=".jpeg, .jpg, .png, .gif"
											ref={inputUploadRef}
											style={{ display: "none" }}
											onChange={handleImageChange}
										/>
										{selectedImage ? (
											<div className={styles.image_wrapper}>
												<Image
													src={URL.createObjectURL(
														selectedImage
													)}
													alt="image"
													fill
													className={styles.image}
												/>
											</div>
										) : (
											<div className={styles.image_placeholder}>
												<Image
													src="/svgs/icon-image.svg"
													height={30}
													width={30}
													alt="image-icon"
													onClick={openUploadDialog}
													style={{ cursor: "pointer" }}
												/>
												<p>
													Drop your image here, or{" "}
													<label
														onClick={openUploadDialog}
														className={
															styles.click_to_upload_text
														}
													>
														click to upload{" "}
													</label>
												</p>
												<p>
													Images should be horizontal, at least
													1280x720px, and 72 DPI (dots per
													inch).
												</p>
											</div>
										)}
									</div>
									{selectedImage && (
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
									<h2 className={styles.title}>Course type</h2>
									<ul className={styles.flex_fields}>
										{courseTypes.map((courseType, index) => (
											<CustomRadioButton
												key={index}
												name="courseType"
												label={courseType.label}
												value={courseType.value}
												addPadding={false}
												checked={
													values.courseType === courseType.value
												}
												onChange={() =>
													setFieldValue(
														"courseType",
														courseType.value
													)
												}
											/>
										))}
									</ul>
									{errors.courseType && touched.courseType && (
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
												placeholder="E.g notion, google drive etc"
												description="This link directs users to access the course after purchase or enrollment."
												error={touched.link && errors.link}
											/>
										)}
									</Field>
								</div>
								{(values.courseType === CourseType.Video ||
									values.courseType === CourseType.Audio) && (
									<div className={styles.row}>
										<div className={styles.field}>
											<Field name="duration">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Duration"
														placeholder="E.g 20 mins"
														error={
															touched.duration &&
															errors.duration
														}
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
														error={
															touched.size && errors.size
														}
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
														error={
															touched.pages && errors.pages
														}
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
														error={
															touched.size && errors.size
														}
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
											date={date.startDate}
										/>
										<DateContainer
											label="End date"
											selectDate={selectDate}
											type="endDate"
											date={date.endDate}
										/>
									</div>
								)}
								<div className={styles.field}>
									<Field name="price">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Price"
												placeholder="Enter price"
												error={touched.price && errors.price}
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
	);
};

export default CourseDetails;

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
