import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import React from "react";
import styles from "./DashboardUserHeader.module.scss";
import { Button, Ratings } from "@/shared";
import Image from "next/image";
import Link from "next/link";
const DashboardUserHeader = ({ data }: any) => {
	return (
		<div className={styles.wrapper}>
			<HeaderSubText title="User Information" />
			<div className={styles.container}>
				<div className={styles.container__left}>
					<div className={styles.left_top}>
						<div className={styles.image_container}>
							<Image
								src={data.avatar || "/svgs/user.svg"}
								width={100}
								height={100}
								alt="user avatar"
								className={styles.user_image}
							/>
							<span className={styles.active_status}></span>
						</div>
						<div>
							<div className={styles.name_container}>
								<h3 className={styles.user_name}>{data.userName}</h3>
								<span className={styles.verification_status}>
									Verified
								</span>
							</div>
							<p className={styles.faded_text}>{data.email}</p>
							<p className={styles.faded_text}>{data.address}</p>
							<div className={styles.flex_item}>
								<p className={styles.faded_text}>20 Deals </p>
								<p className={styles.divider}>|</p>
								<span className={styles.rating_item}>
									<Ratings rating={4} />
									<p> {4.0}</p>
								</span>
							</div>
							<div className={styles.flex_item}>
								<p className={styles.faded_text}>Date joined :</p>
								<p className={styles.date_text}>
									{" "}
									{data.createdAt.split("T")[0]}
								</p>
							</div>
						</div>
					</div>
					<div className={styles.socials_container}>
						{data.twitter && (
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={data.twitter}
							>
								<Image
									src="/svgs/twitter.svg"
									width={50}
									height={50}
									alt="social icon"
								/>
							</Link>
						)}
						{data.instagram && (
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={data.instagram}
							>
								<Image
									src="/svgs/insta.svg"
									width={50}
									height={50}
									alt="social icon"
								/>
							</Link>
						)}
						{data.linkedin && (
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={data.linkedin}
							>
								<Image
									src="/svgs/linkedin.svg"
									width={50}
									height={50}
									alt="social icon"
								/>
							</Link>
						)}
						{data.facebook && (
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={data.facebook}
							>
								<Image
									src="/svgs/facebook.svg"
									width={50}
									height={50}
									alt="social icon"
								/>
							</Link>
						)}
					</div>
				</div>
				<div className={styles.btns_container}>
					<Button buttonType="secondary" className={styles.view_profile}>
						View profile
					</Button>
					<Button buttonType="secondary" className={styles.deactivate_btn}>
						Deactivate user
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DashboardUserHeader;
