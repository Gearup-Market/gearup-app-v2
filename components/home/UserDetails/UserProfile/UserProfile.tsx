import React from "react";
import styles from "./UserProfile.module.scss";
import Image from "next/image";
import { Button, CustomImage, Ratings } from "@/shared";
import { VerifyIcon } from "@/shared/svgs/dashboard";
import { IUser } from "@/app/api/hooks/users/types";
import { useAppSelector } from "@/store/configureStore";
import Link from "next/link";

interface Props {
	user?: IUser;
}

const UserDetailsProfile = ({ user }: Props) => {
	const loggedInUser = useAppSelector((state) => state.user);
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
					{user?.userName}
					{
						user?.isVerified &&
						<span className={styles.verfiy_icon}>
							<VerifyIcon />
						</span>
					}
				</p>
				<p className={styles.location}>Lagos, Nigeria</p>
				<div className={styles.ratings_container}>
					<Ratings rating={0} showRatingNumber={true} readOnly />
				</div>
				<p>0 deals</p>
				{
					user?._id !== loggedInUser?._id &&
					<Link href={`/user/messages`}>
						<Button buttonType="secondary" iconPrefix="/svgs/send.svg">Send a message</Button>
					</Link>
				}
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
