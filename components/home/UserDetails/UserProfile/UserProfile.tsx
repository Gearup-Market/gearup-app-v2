import React from "react";
import styles from "./UserProfile.module.scss";
import { Button, CustomImage, Ratings } from "@/shared";
import { VerifyIcon } from "@/shared/svgs/dashboard";
import { UserUpdateResp } from "@/app/api/hooks/users/types";
import { useAppSelector } from "@/store/configureStore";

interface Props {
	user?: UserUpdateResp;
	isFreelancer?: boolean
}

const UserDetailsProfile = ({ user, isFreelancer }: Props) => {
	const { kyc } = useAppSelector(state => state.user);
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
						style={{ borderRadius: "50%" }}
					/>
				</div>
				<p className={styles.name}>
					{user?.userName}
					{!!kyc && (
						<span className={styles.verfiy_icon}>
							<VerifyIcon />
						</span>
					)}
				</p>
				<p className={styles.location}>{user?.address ?? "N/A"}</p>
				<div className={styles.ratings_container}>
					<Ratings rating={user?.rating} showRatingNumber={true} readOnly />
				</div>
				<p>{user?.totalDeals} deals</p>
				{
					isFreelancer &&
					<Button buttonType="primary">
						Hire me
					</Button>
				}
				{/* {user?.userId !== userId && (
					<Link href={`/user/messages`}>
						<Button buttonType="secondary" iconPrefix="/svgs/send.svg">
							Send a message
						</Button>
					</Link>
				)} */}
			</div>
		</div>
	);
};

export default UserDetailsProfile;
