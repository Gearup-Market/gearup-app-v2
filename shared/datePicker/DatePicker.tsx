"use client";

import { useEffect, useRef, useState } from "react";
// import { DateRangePicker } from "react-date-range";
import { DateRangePicker as OriginalDateRangePicker } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import styles from "./DatePicker.module.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "..";

const DateRangePicker = OriginalDateRangePicker as any;

interface Props {
	setOpenModal: (e?: any) => void;
	setInputDate: (e?: any) => void;
	openModal: boolean;
	inputDate: any;
	setIsDateSelected: (e?: any) => void;
}

const DatePicker = ({
	setOpenModal,
	setInputDate,
	openModal,
	inputDate,
	setIsDateSelected
}: Props) => {
	const apply = () => {
		setIsDateSelected(true);
		setOpenModal(false);
	};
	useEffect(() => {
		document.body.style.overflow = openModal ? "hidden" : "auto";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [openModal]);

	const close = () => {
		setInputDate([
			{
				startDate: new Date(),
				endDate: addDays(new Date(), 0),
				key: "selection"
			}
		]);
		// setIsDateSelected(false);
		setOpenModal(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.picker_container}>
				<div
					className={styles.close_background}
					onClick={() => setOpenModal(false)}
				></div>
				<div
					className={styles.picker_modal}
					onClick={(e: React.MouseEvent<HTMLDivElement>) =>
						e.nativeEvent.stopImmediatePropagation()
					}
				>
					<DateRangePicker
						onChange={(item: any) => setInputDate([item.selection])}
						editableDateInputs={true}
						moveRangeOnFirstSelection={false}
						ranges={inputDate}
						months={1}
						showDateDisplay={false}
						direction="horizontal"
						className="calendarElement"
						displayMode="dateRange"
						rangeColors={["#F76039", "#FEEFEB", "#F76039"]}
						minDate={new Date()}
						// classNames={}
					/>
					<div className={styles.row}>
						<Button
							buttonType="transparent"
							className={styles.button}
							onClick={close}
						>
							Cancel
						</Button>
						<Button onClick={apply}>Apply</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DatePicker;
