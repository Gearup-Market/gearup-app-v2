import React from "react";
import styles from "./UserProfileSection.module.scss";
import Image from "next/image";
import { CustomImage, Ratings } from "@/shared";

const UserProfileSection = () => {
	return (
		<div className={styles.container}>
			<div className={styles.profile_details}>
				<h4 className={styles.title}>PROFILE</h4>
				<div className={styles.profile_image}>
					<CustomImage
						src="/svgs/avatar.svg"
						height={150}
						width={150}
						alt="avatar"
					/>
				</div>
				<p className={styles.name}>Wade Warren</p>
				<p className={styles.location}>Lagos, Nigeria</p>
				<div className={styles.ratings_container}>
					<Ratings rating={0} showRatingNumber={true} />
				</div>
				<p>0 deals</p>
				<div className={styles.socials_icon}>
					<span className={styles.icon}>
						<Image
							src="/svgs/twitter.svg"
							alt="twitter-icon"
							height={30}
							width={30}
						/>
					</span>
					<span className={styles.icon}>
						<Image
							src="/svgs/insta.svg"
							alt="insta-icon"
							height={30}
							width={30}
						/>
					</span>
					<span className={styles.icon}>
						<Image
							src="/svgs/linkedin.svg"
							alt="linkedin-icon"
							height={30}
							width={30}
						/>
					</span>
					<span className={styles.icon}>
						<Image
							src="/svgs/facebook.svg"
							alt="fb-icon"
							height={30}
							width={30}
						/>
					</span>
				</div>
			</div>
			<div className={styles.conversation_about}>
				<p className={styles.title}>CONVERSATION ABOUT</p>
				<div className={styles.conversation_image}>
					<CustomImage
						src="/svgs/convo_image.svg"
						height={150}
						width={150}
						alt="avatar"
					/>
				</div>
				<h2 className={styles.convo_name}>Canon EOS R5 Camera Kit For Sale</h2>
				<p className={styles.text}><span className={styles.amount}>$230</span><span className={styles.day}>/Day</span></p>
			</div>
		</div>
	);
};

export default UserProfileSection;
