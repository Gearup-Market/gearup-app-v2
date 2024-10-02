import React from "react";
import styles from "./UserProfile.module.scss";
import Image from "next/image";
import { Button, CustomImage, Ratings } from "@/shared";
import { VerifyIcon } from "@/shared/svgs/dashboard";

interface Props{
    user: any
}

const UserDetailsProfile = ({user}:Props) => {
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
				<p className={styles.name}>
					Wade Warren{" "}
					<span className={styles.verfiy_icon}>
						<VerifyIcon />
					</span>
				</p>
				<p className={styles.location}>Lagos, Nigeria</p>
				<div className={styles.ratings_container}>
					<Ratings rating={0} showRatingNumber={true} />
				</div>
				<p>0 deals</p>

                <Button buttonType="secondary" iconPrefix="/svgs/send.svg">Send a message</Button>
                        </div>
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
	);
};

export default UserDetailsProfile;
