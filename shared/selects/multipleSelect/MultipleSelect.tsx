"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./MultipleSelect.module.scss";
import Button from "@/shared/button/Button";

interface Props {
	options: any[];
	onOptionChange?: (option?: any) => void;
	label?: string;
	title?: string;
	objectOption?: string;
}

const MultipleSelect = ({
	options,
	onOptionChange,
	label,
	title,
	objectOption,
}: Props) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [localArr, setLocalArr] = useState<any[]>([]);

	const closeModal = useCallback(() => {
		setOpenModal(false);
	}, [setOpenModal]);

	const onOptionClicked = (option: any) => {
		const arrElement = options.find(item => item.id === option.id);
		const tempArray = localArr.includes(arrElement)
			? localArr.filter((item: any) => item.id !== arrElement.id)
			: [...localArr, arrElement];
		setLocalArr(tempArray);
	};

	const handleDelete = (option: any) => {
		const arrElement = options.find(item => item.id === option.id);
		const tempArray = localArr.filter((item: any) => item.id !== arrElement.id);
		setLocalArr(tempArray);
	};

	useEffect(() => {
		if (!onOptionChange) return;
		if (!!objectOption) {
			onOptionChange({
				name: objectOption,
				selectedValues: localArr,
				fieldType: "multiple",
			});
			return;
		}
		onOptionChange(localArr);
	}, [localArr]);

	useEffect(() => {
		document.addEventListener("click", closeModal);
		return () => {
			document.removeEventListener("click", closeModal);
		};
	}, [closeModal]);

	return (
		<div className={styles.container}>
			<label htmlFor="" className={styles.label}>
				{label}
			</label>
			<div className={styles.row}>
				<div className={styles.row_block}>
					{localArr.map((item: any, index: number) => (
						<Button
							key={index}
							className={styles.button}
							onClick={() => handleDelete(item)}
						>
							{item.name}{" "}
							<div className={styles.closeModal}>
								<span></span>
								<span></span>
							</div>
						</Button>
					))}
				</div>
				<Button
					buttonType="transparent"
					className={styles.select_button}
					onClick={(e: React.MouseEvent<HTMLDivElement>) => {
						setOpenModal(true);
						e.nativeEvent.stopImmediatePropagation();
					}}
				>
					Choose
				</Button>
			</div>

			{openModal && (
				<div className={styles.modal_container}>
					<div
						className={styles.modal}
						onClick={(e: React.MouseEvent<HTMLDivElement>) =>
							e.nativeEvent.stopImmediatePropagation()
						}
					>
						<div className={styles.header}>
							<div className={styles.text}>
								<h1>{title}</h1>
								<p>You can select more than one:</p>
							</div>
							<div className={styles.closeModal_container} onClick={close}>
								<div className={styles.closeModal}>
									<span></span>
									<span></span>
								</div>
							</div>
						</div>
						<div className={styles.body}>
							{options.map((option: any, index: number) => (
								<Button
									buttonType={
										localArr.includes(option)
											? "primary"
											: "transparent"
									}
									key={index}
									className={styles.button}
									onClick={() => onOptionClicked(option)}
								>
									{option.name}
								</Button>
							))}
						</div>
						<div className={styles.footer}>
							<Button onClick={closeModal} className={styles.button}>
								Continue
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MultipleSelect;
