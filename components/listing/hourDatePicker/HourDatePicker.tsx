"use client";

import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./HourDatePicker.module.scss";
import Image from "next/image";
import Calendar from "react-calendar";
import format from "date-fns/format";
import "react-calendar/dist/Calendar.css";
import Modal from "@/shared/modals/modal/Modal";
import { Button, HourSelect, Select } from "@/shared";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
	setOpenModal: (e?: any) => void;
	setInputDate: (e?: any) => void;
	openModal: boolean;
	inputDate: any;
}

interface Period {
	date: Date;
	time: number;
	id: number;
}

const emptyPeriod: Period = {
	date: new Date(),
	time: 0,
	id: 1
};

const HourDatePicker = ({ setOpenModal, setInputDate, openModal, inputDate }: Props) => {
	const [period, setPeriod] = useState<Period[]>([emptyPeriod]);

	const addOption = () => {
		if (!checkEmptyState(period)) return;
		setPeriod(prev => [...prev, { ...emptyPeriod, id: prev.length + 1 }]);
	};
	// const apply = () => {
	// 	setIsDateSelected(true);
	// 	setOpenModal(false);
	// };

	const updatePeriod = (index: number, field: keyof Period, value: any) => {
		setPeriod(prev => prev.map(p => (p.id === index ? { ...p, [field]: value } : p)));
	};

	useEffect(() => {
		document.body.style.overflow = openModal ? "hidden" : "auto";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [openModal]);

	console.log(period);
	return (
		<Modal
			openModal={openModal}
			setOpenModal={setOpenModal}
			title="Choose date & Time"
			className={styles.modal}
		>
			<div className={styles.container}>
				{period.map(_period => (
					<Block
						index={_period.id}
						key={_period.id}
						date={_period.date}
						time={_period.time}
						updatePeriod={updatePeriod}
					/>
				))}

				<Button
					className={styles.button}
					buttonType="transparent"
					onClick={addOption}
				>
					<div className={styles.icon}>
						<Image src="/svgs/grad-add.svg" fill alt="" />
					</div>
					<p>Add another date</p>
				</Button>
			</div>
			<div className={styles.divider}></div>
			<div className={styles.grid}>
				<Button buttonType="secondary">Cancel</Button>
				<Button>Apply</Button>
			</div>
		</Modal>
	);
};

export default HourDatePicker;

interface BlockProps {
	index: number;
	date: Date;
	time: number;
	updatePeriod: (index: number, field: keyof Period, value: any) => void;
}

const Block = ({ index, date, time, updatePeriod }: BlockProps) => {
	const [showCalendar, setShowCalendar] = useState<boolean>(false);
	const [isDateSelected, setIsDateSelected] = useState<boolean>(false);

	const onDateChange = (newDate: any) => {
		updatePeriod(index, "date", newDate);
		setIsDateSelected(true);
		setShowCalendar(false);
	};

	const onTimeChange = (newTime: number) => {
		updatePeriod(index, "time", newTime);
	};

	return (
		<div className={styles.block}>
			<div className={styles.row}>
				<h3>Date {index}</h3>
				{/* <FontAwesomeIcon /> */}
			</div>
			<div
				className={styles.input_field}
				onClick={() => setShowCalendar(!showCalendar)}
			>
				<div className={styles.icon}>
					<Image src="/svgs/calendar.svg" fill alt="" sizes="100vw" />
				</div>
				<div className={styles.text}>
					<p>
						{isDateSelected ? `${format(date, "MM/dd/yyyy")}` : "Choose date"}
					</p>
				</div>
				{showCalendar && (
					<div
						className={styles.calendar_container}
						onClick={e => e.nativeEvent.stopImmediatePropagation()}
					>
						<Calendar
							onChange={onDateChange}
							value={date}
							minDate={new Date()}
							className={styles.calender}
							prev2Label={null}
							next2Label={null}
						/>
					</div>
				)}
			</div>
			<HourSelect identifier="value" value={time} onOptionChange={onTimeChange} />
		</div>
	);
};

const checkEmptyState = (period: Period[]) => {
	if (period.length) {
		const lastIndex = period.length - 1;
		if (!period[lastIndex].date || !period[lastIndex].time) {
			toast.error("Please fill in all the details of last option");
			return false;
		}
	}
	return true;
};
