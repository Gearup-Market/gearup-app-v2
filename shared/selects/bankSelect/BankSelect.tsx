"use client";

import React, { useState, useMemo, useEffect } from "react";
import styles from "./BankSelect.module.scss";
import Image from "next/image";
import SmallLoader from "@/shared/loaders/smallLoader/SmallLoader";
import { shortenTitle } from "@/utils";
import SearchBox from "@/shared/searchbox/SearchBox";
import { useGlobalContext } from "@/contexts/AppContext";
import { debounce } from "lodash";
import InputField from "../../inputField/InputField";
import { useGetBanks } from "@/app/api/hooks/settings";

export interface OptionProps {
	label: string;
}

export interface SelectProps {
	onOptionChange: any;
	className?: string;
	title?: string;
	defaultOption?: string;
	label?: string;
	error?: string;
}

const BankSelect: React.FunctionComponent<SelectProps> = ({
	onOptionChange,
	className,
	title,
	defaultOption = "Select a bank",
	label,
	error
}) => {
	const { data } = useGetBanks();
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [displayedBank, setDisplayedBank] = useState<any>(null);
	const banks = data?.data;

	const toggling = () => {
		setIsOpenModal(!isOpenModal);
	};
	const filteredBanks = useMemo(() => {
		return searchTerm.length > 0
			? banks?.filter((bank: any) =>
					bank.name.toLowerCase().includes(searchTerm.toLowerCase())
			  )
			: banks;
	}, [searchTerm, banks]);

	const onOptionClicked = (selectedIndex: number) => () => {
		setIsOpenModal(false);
		const selectedBank = banks?.find((bank: any) => bank.id === selectedIndex);
		setDisplayedBank(selectedBank);
		// onOptionChange((prev: any) => ({
		// 	...prev,
		// 	bankName: selectedBank!.name,
		// 	bankCode: selectedBank!.code
		// }));
		onOptionChange("bankName", selectedBank!.name);
		onOptionChange("bankCode", selectedBank!.code);
	};

	return (
		<div className={styles.select_wrapper}>
			{!!label && <label className={styles.input_label}>{label}</label>}
			<div className={`${styles.select} ${className}`}>
				{!banks?.length ? (
					<SmallLoader />
				) : (
					<div className={styles.select_header} onClick={toggling}>
						<div className={styles.select_smallRow}>
							<div className={styles.flex}>
								<p>
									{title ? title + ":" : ""}{" "}
									<span>
										{!displayedBank
											? defaultOption
											: shortenTitle(displayedBank.name, 42)}
									</span>
								</p>
							</div>
							<div
								className={`${styles.select_dropDownImage}`}
								style={{ rotate: isOpenModal ? "180deg" : "0deg" }}
							>
								<Image
									src="/svgs/chevron.svg"
									fill
									sizes="100vw"
									alt=""
								/>
							</div>
						</div>
					</div>
				)}

				{isOpenModal && (
					<div className={styles.select_body}>
						<BankSearchBox onOptionChange={setSearchTerm} />
						<ul className={styles.select_listContainer}>
							{filteredBanks!.map((option: any) => (
								<li
									onClick={onOptionClicked(option.id)}
									key={option.id}
									className={styles.select_listItem}
								>
									<div className={styles.select_row}>
										<p>{option.name}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			{!!error && (
				<label className={styles.input_label} style={{ color: "#FC0000" }}>
					{error}
				</label>
			)}
		</div>
	);
};

export default BankSelect;

interface Props {
	placeholder?: string;
	className?: string;
	onOptionChange: (searchTerm: string) => void;
}

const BankSearchBox = ({ placeholder = "Search", className, onOptionChange }: Props) => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		const debouncedChange = debounce(onOptionChange, 300);
		debouncedChange(searchTerm);

		// Cleanup the debounce function on component unmount
		return () => {
			debouncedChange.cancel();
		};
	}, [searchTerm, onOptionChange]);

	return (
		<div className={`${styles.searchBox} ${className}`}>
			<InputField
				icon="/svgs/icon-search.svg"
				onChange={e => setSearchTerm(e.target.value)}
				value={searchTerm}
				placeholder={placeholder}
				className={styles.input}
				iconPosition="suffix"
			/>
		</div>
	);
};
