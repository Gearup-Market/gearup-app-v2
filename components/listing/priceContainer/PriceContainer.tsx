"use client";

import { useState } from "react";
import styles from "./PriceContainer.module.scss";
import { addDays } from "date-fns";
import Image from "next/image";
import { Button, DatePicker, Logo } from "@/shared";
import format from "date-fns/format";

const PriceContainer = () => {
	const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
	const [inputDate, setInputDate] = useState<any>([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 0),
			key: "selection",
		},
	]);
	const [openModal, setOpenModal] = useState<boolean>(false);
	return (
		<div className={styles.container}>
			<div className={styles.price_card}>
				<div className={styles.card_header}>
					<div className={styles.text} style={{ marginBottom: "1.6rem" }}>
						<h2>Hollyland Solidcom C1-6S Intercoms 6x</h2>
					</div>
					<div className={styles.text}>
						<h1>
							$120
							<span style={{ color: "#4B525A", fontWeight: 400 }}>
								/Day
							</span>
						</h1>
					</div>
				</div>
				<div className={styles.insurance_container}>
					<div className={styles.icon}>
						<Image src="/svgs/insurance.svg" fill alt="" sizes="100vw" />
					</div>
					<div className={styles.details}>
						<div className={styles.text}>
							<h3>Gearup Global Insurance coverage</h3>
							<p>
								Gearup Global Insurance coverage starts from 17:00 the day
								before the shoot and ends at 10:00 the day after the
								shoot.{" "}
							</p>
							<a href="#" target="_blank" rel="noreferrer">
								Learn more
							</a>
						</div>
					</div>
				</div>
				<div className={styles.input_field}>
					<div className={styles.icon} onClick={() => setOpenModal(true)}>
						<Image src="/svgs/calendar.svg" fill alt="" sizes="100vw" />
					</div>
					<div className={styles.text}>
						<p>
							{isDateSelected
								? `${format(
										inputDate[0].startDate,
										"MM/dd/yyyy"
								  )} to ${format(inputDate[0].endDate, "MM/dd/yyyy")}`
								: "Choose pickup / return dates"}
						</p>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button buttonType="secondary" className={styles.button}>
						Ask for availability
					</Button>
					<Button className={styles.button}>Add to cart</Button>
				</div>
				{openModal && (
					<DatePicker
						openModal={openModal}
						setInputDate={setInputDate}
						setOpenModal={setOpenModal}
						inputDate={inputDate}
						setIsDateSelected={setIsDateSelected}
					/>
				)}
			</div>
			<div className={styles.ad_card}>
				<Logo />
				<div className={styles.title}>
					<h1>Need Equipment Urgently?</h1>
					<p>Call us and we’ll secure it for you.</p>
				</div>
				<div className={styles.row}>
					<div className={styles.small_row}>
						<div className={styles.icon}>
							<Image src="/svgs/whatsapp.svg" alt="" fill sizes="100vw" />
						</div>
						<div className={styles.title}>
							<p>Whatsapp</p>
						</div>
					</div>
					<div className={styles.small_row}>
						<div className={styles.icon}>
							<Image src="/svgs/phone.svg" alt="" fill sizes="100vw" />
						</div>
						<div className={styles.title}>
							<p>Phone call</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PriceContainer;
