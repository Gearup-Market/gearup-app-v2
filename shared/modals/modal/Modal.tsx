"use client";

import React, { useCallback, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Title } from "@/shared";
import Image from "next/image";

interface Props {
	setOpenModal: (e?: any) => void;
	openModal: boolean;
	title: string;
	className?: string;
	children?: React.ReactNode;
	description?: string;
	addBackIcon?: boolean;
	onClickBack?: () => void;
}

const Modal = ({
	openModal,
	setOpenModal,
	title,
	className,
	children,
	description,
	addBackIcon = false,
	onClickBack,
}: Props) => {
	const close = useCallback(() => {
		setOpenModal(false);
	}, [setOpenModal]);
	useEffect(() => {
		const handleClickOutside = () => {
			close();
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [close]);
	useEffect(() => {
		document.body.style.overflow = openModal ? "hidden" : "auto";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [openModal]);
	return (
		<div className={styles.modal_container} data-active={openModal}>
			<div
				className={`${styles.modal} ${className}`}
				onClick={(e: React.MouseEvent<HTMLDivElement>) =>
					e.nativeEvent.stopImmediatePropagation()
				}
			>
				<div className={styles.header}>
					<span>
						{addBackIcon && <Image onClick={onClickBack} src="/svgs/arrow-left.svg" alt="logo" width={30} height={30} className={styles.back_icon} />}
						<Title title={title} description={description} />
					</span>
					<div className={styles.closeModal_container} onClick={close}>
						<div className={styles.closeModal}>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
				<div className={styles.body}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
