"use client";

import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Modal from "@/shared/modals/modal/Modal";
import Calendar from "react-calendar";
import styles from "./CourseListingView.module.scss";

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

export default DateContainer;

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
