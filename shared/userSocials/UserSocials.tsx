import React from 'react'
import styles from './UserSocials.module.scss'
import Image from 'next/image'
import { UserUpdateResp } from "@/app/api/hooks/users/types";
import Link from 'next/link';

const UserSocials = ({ user }: { user: UserUpdateResp }) => {
	if(!user) return null
	return (
		<div className={styles.socials_icon}>
			{
				user.twitter &&
				<Link href={user.twitter} target="_blank" className={styles.icon}>
					<Image
						src="/svgs/twitter.svg"
						alt="twitter-icon"
						height={30}
						width={30}
					/>
				</Link>
			}
			{
				user.instagram &&
				<Link href={user.instagram} target="_blank" className={styles.icon}>
					<Image
						src="/svgs/insta.svg"
						alt="insta-icon"
						height={30}
						width={30}
					/>
				</Link>
			}
			{
				user.linkedin &&
				<Link href={user.linkedin} target="_blank" className={styles.icon}>
					<Image
						src="/svgs/linkedin.svg"
						alt="linkedin-icon"
						height={30}
						width={30}
					/>
				</Link>
			}
			{
				user.facebook &&
				<Link href={user.facebook} target="_blank" className={styles.icon}>
					<Image
						src="/svgs/facebook.svg"
						alt="fb-icon"
						height={30}
						width={30}
					/>
				</Link>
			}
		</div>
	)
}

export default UserSocials