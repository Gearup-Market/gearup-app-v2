import React from "react";
import styles from "./UserProfile.module.scss";
import { Button, CustomImage, Ratings } from "@/shared";
import { VerifyIcon } from "@/shared/svgs/dashboard";
import { UserUpdateResp } from "@/app/api/hooks/users/types";
import { useAppSelector } from "@/store/configureStore";
import Link from "next/link";

interface Props {
	user?: UserUpdateResp;
}

const UserDetailsProfile = ({ user }: Props) => {
	const loggedInUser = useAppSelector((state) => state.user);
	return (
		<div className={styles.container}>
			<div className={styles.profile_details}>
				<h4 className={styles.title}>PROFILE</h4>
				<div className={styles.profile_image}>
					<CustomImage
						src={!!user?.avatar ? user.avatar : "/svgs/avatar-user.svg"}
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
				<p className={styles.location}>{user?.address ?? "N/A"}</p>
				<div className={styles.ratings_container}>
					<Ratings rating={0} showRatingNumber={true} readOnly />
				</div>
				<p>0 deals</p>
				{
					user?.userId !== loggedInUser?._id &&
					<Link href={`/user/messages`}>
						<Button buttonType="secondary" iconPrefix="/svgs/send.svg">Send a message</Button>
					</Link>
				}
			</div>
			
		</div>
	);
};

export default UserDetailsProfile;
