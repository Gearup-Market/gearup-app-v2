"use client";

import React, { useState } from "react";
import styles from "./AdminNavbar.module.scss";
import { Button, Logo, UrlPath } from "@/shared";
import { ArrowDownIcon } from "@/shared/svgs/dashboard";
import Image from "next/image";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/configureStore";

const AdminNavbar = () => {
	const user = useAppSelector(s => s.user);
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const pathname = usePathname();
	const [showMenubar, setShowMenubar] = useState<boolean>(false);

	return (
		<div className={styles.navbar_container}>
			<div className={styles.logo_icon}>
				<Logo type="dark" />
			</div>
			<div className={styles.title_container}>
				<UrlPath />
			</div>
			<div className={styles.icons_container}>
				<div className={styles.mob_buttons}>
					<Button
						buttonType="transparent"
						className={`${styles.small_icon} ${styles.circle_border}`}
					>
						<Image
							src={"/svgs/icon-notification.svg"}
							height={70}
							width={70}
							alt=""
							sizes="100vw"
						/>
					</Button>
					<Button
						onClick={() => setShowMenubar(!showMenubar)}
						buttonType="transparent"
						className={styles.small_icon}
					>
						<Image
							src={
								!collapsed
									? "/svgs/icon-hamburger.svg"
									: "/svgs/icon-cart.svg"
							}
							height={70}
							width={70}
							alt=""
							sizes="100vw"
						/>
					</Button>
				</div>
			</div>
			<div className={styles.navbar_container__details}>
				<div className={styles.avatar}>
					<Image
						src={user.avatar || "/svgs/user.svg"}
						width={40}
						height={40}
						alt="avatar"
					/>
				</div>
				<span className={styles.name}>{user.userName}</span>
				{/* <span>
					<ArrowDownIcon />
				</span> */}
			</div>

			{showMenubar && (
				<div className={styles.sidemenu_container}>
					<AdminSidebar
						isMobile={true}
						onClose={() => setShowMenubar(!showMenubar)}
					/>
				</div>
			)}
		</div>
	);
};

export default AdminNavbar;
