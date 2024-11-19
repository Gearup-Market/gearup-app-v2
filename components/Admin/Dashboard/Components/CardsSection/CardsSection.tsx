"use client";
import React, { useMemo, useState } from "react";
import styles from "./CardsSection.module.scss";
import { DatePicker, InputField, Select } from "@/shared";
import { DashboardCard } from "..";
import Image from "next/image";
import { ArrowUpIcon } from "@/shared/svgs/dashboard";
import { addDays } from "date-fns";
import format from "date-fns/format";
import { useGetAdminDashboard } from "@/app/api/hooks/Admin/users";
import { useAppSelector } from "@/store/configureStore";
import { formatNum } from "@/utils";
import { PageLoader } from "@/shared/loaders";

const CardsSection = () => {
	const { token } = useAppSelector(s => s.user);
	const { data } = useGetAdminDashboard(token as string);
	const [selectedTime, setSelectedTime] = useState<string>();
	const [allTime, setAllTime] = useState();
	const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
	const [inputDate, setInputDate] = useState<any>([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 0),
			key: "selection"
		}
	]);
	const [openModal, setOpenModal] = useState<boolean>(false);

	const cardsList = useMemo(() => {
		if (!data) return [];
		return [
			{
				id: 1,
				title: "Total revenue",
				icon: "/svgs/total-revenue.svg",
				percentage: 0,
				amount: data.data.totalRevenue
			},
			{
				id: 2,
				title: "Active listings",
				icon: "/svgs/active-icon.svg",
				percentage: 0,
				// amount: data.data.activeListings.total,
				amount: 0
			},
			{
				id: 3,
				title: "Ongoing deals",
				icon: "/svgs/ongoing-icon.svg",
				percentage: 0,
				amount: data.data.ongoingDeals.total
			},
			{
				id: 4,
				title: "Completed deals",
				icon: "/svgs/completed-icon.svg",
				percentage: 0,
				amount: data.data.completedDeals.total
			},
			{
				id: 5,
				title: "Declined deals",
				icon: "/svgs/decline-icon.svg",
				percentage: 0,
				amount: data.data.declinedDeals.total
			},
			{
				id: 6,
				title: "In dispute",
				icon: "/svgs/in-dispute.svg",
				percentage: 0,
				// amount: data.data.inDispute.total,
				amount: 0
			}
		];
	}, [data]);

	const timeOptions = [
		"yesterday",
		"this week",
		"last week",
		"this month",
		"last month",
		"all time"
	];

	const onOptionChange = (option: any) => {
		setSelectedTime(option.value);
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__date_container}>
				<div className={styles.date_picker_container}>
					<Select options={timeOptions} onOptionChange={onOptionChange} />
				</div>
				<div className={styles.container__date_container__date_display}>
					{openModal && (
						<DatePicker
							openModal={openModal}
							setInputDate={setInputDate}
							setOpenModal={setOpenModal}
							inputDate={inputDate}
							setIsDateSelected={setIsDateSelected}
						/>
					)}
					<div
						className={styles.input_field}
						onClick={() => setOpenModal(true)}
					>
						<p>
							{format(inputDate[0].startDate, "MM/dd/yyyy")} -{" "}
							{format(inputDate[0].endDate, "MM/dd/yyyy")}
						</p>
					</div>
				</div>
			</div>
			<div>
				<ul className={styles.container__cards_container}>
					{cardsList.length ? (
						cardsList.map(card => (
							<DashboardCard key={card.id}>
								<div className={styles.container__cards_container__item}>
									<div
										className={
											styles.container__cards_container__item__left
										}
									>
										<Image
											src={card.icon}
											alt={card.title}
											width={16}
											height={16}
										/>
										<div>
											<p className={styles.title}>{card.title}</p>
											<p className={styles.amount}>
												{formatNum(card.amount)}
											</p>
										</div>
									</div>
									{/* <div
									className={
										styles.container__cards_container__item__right
									}
								>
									<p className={styles.percentage}>
										<ArrowUpIcon />
										{card.percentage}%
									</p>
								</div> */}
								</div>
							</DashboardCard>
						))
					) : (
						<PageLoader />
					)}
				</ul>
			</div>
		</div>
	);
};

export default CardsSection;
