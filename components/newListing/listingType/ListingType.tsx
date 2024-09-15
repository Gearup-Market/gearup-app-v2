import React from "react";
import styles from "./ListingType.module.scss";
import Image from "next/image";
import { Tooltip } from "@mui/material";
interface Props {
	src?: string;
	title: string;
	name?: string;
	type?: string;
	toggle?: (e: string) => void;
	checked: boolean;
	tipDescription?: string;
	showToolTip?: boolean;
	handleToggle?: () => void;
}

const ListingType = ({ src, title, toggle, checked, tipDescription, showToolTip = false, handleToggle, type }: Props) => {

	const handleToggling = () => {
		if (type === "rent" || type === "listingView") {
			console.log("title was called")
			toggle ? toggle(title) : null;
		} else {
			handleToggle ? handleToggle() : null;
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.small_row}>
				{!!src && (
					<div className={styles.icon}>
						<Image src={src} alt="" fill sizes="100vw" />
					</div>
				)}
				<div className={styles.text}>
					<p>{title}</p>
					{
						showToolTip && (
							<Tooltip title={tipDescription} className="">
								<Image
									src="/svgs/required-icon.svg"
									alt=""
									height={14}
									width={14}
								/>
							</Tooltip>
						)
					}
				</div>
			</div>
			<label className={styles.switch}>
				<input type="checkbox" onChange={handleToggling} checked={checked} />
				<span className={styles.slider}></span>
			</label>
		</div>
	);
};

export default ListingType;
