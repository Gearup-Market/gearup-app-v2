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
	setHourRentalBreakdown: (e?: any) => void;
	setIsDateSelected: (e?: any) => void;
}

interface Period {
	date: Date;
	quantity: number;
	id: number;
}

const emptyPeriod: Period = {
	date: new Date(),
	quantity: 0,
	id: 1
};

const HourDatePicker = ({
	setOpenModal,
	setInputDate,
	openModal,
	inputDate,
	setHourRentalBreakdown,
	setIsDateSelected
}: Props) => {
	const [period, setPeriod] = useState<Period[]>([emptyPeriod]);

	const addOption = () => {
		if (!checkEmptyState(period)) return;
		setPeriod(prev => [...prev, { ...emptyPeriod, id: prev.length + 1 }]);
	};

	const updatePeriod = (index: number, field: keyof Period, value: any) => {
		setPeriod(prev => prev.map(p => (p.id === index ? { ...p, [field]: value } : p)));
	};

	const deletePeriod = (index: number) => {
		setPeriod(prev => prev.filter(p => p.id !== index));
	};

	useEffect(() => {
		document.body.style.overflow = openModal ? "hidden" : "auto";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [openModal]);

	const applyDateAndTime = () => {
		if (!checkEmptyState(period)) return toast.error("Please select a date and time");
		setInputDate([
			{
				startDate: period[0].date,
				endDate: period[period.length - 1].date,
				key: "selection"
			}
		]);
		setHourRentalBreakdown(period);
		setIsDateSelected(true);
		setOpenModal(false);
	};

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
						quantity={_period.quantity}
						updatePeriod={updatePeriod}
						deletePeriod={deletePeriod}
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
				<Button
					buttonType="secondary"
					onClick={() => setOpenModal(false)}
					className={styles.back_button}
				>
					Cancel
				</Button>
				<Button onClick={applyDateAndTime}>Apply</Button>
			</div>
		</Modal>
	);
};

export default HourDatePicker;

interface BlockProps {
	index: number;
	date: Date;
	quantity: number;
	updatePeriod: (index: number, field: keyof Period, value: any) => void;
	deletePeriod: (index: number) => void;
}

const Block = ({ index, date, quantity, updatePeriod, deletePeriod }: BlockProps) => {
	const [showCalendar, setShowCalendar] = useState<boolean>(false);
	const [isDateSelected, setIsDateSelected] = useState<boolean>(false);

	const onDateChange = (newDate: any) => {
		updatePeriod(index, "date", newDate);
		setIsDateSelected(true);
		setShowCalendar(false);
	};

	const onTimeChange = (newTime: number) => {
		updatePeriod(index, "quantity", newTime);
	};

	return (
		<div className={styles.block}>
			<div className={styles.row}>
				<h3>Date {index}</h3>
				{index !== 1 && (
					<div className={styles.delete} onClick={() => deletePeriod(index)}>
						<Image src="/svgs/trash.svg" fill alt="" sizes="100vw" />
					</div>
				)}
			</div>
			<div className={styles.input_field} onClick={() => setShowCalendar(true)}>
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
						onClick={e => {
							e.nativeEvent.stopImmediatePropagation();
							e.stopPropagation();
						}}
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
			<HourSelect
				identifier="value"
				value={quantity}
				onOptionChange={onTimeChange}
			/>
		</div>
	);
};

const checkEmptyState = (period: Period[]) => {
	if (period.length) {
		const lastIndex = period.length - 1;
		if (!period[lastIndex].date || !period[lastIndex].quantity) {
			toast.error("Please fill in all the details of last option");
			return false;
		}
	}
	return true;
};
