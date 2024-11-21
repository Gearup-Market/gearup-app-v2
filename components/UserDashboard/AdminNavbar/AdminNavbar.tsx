"use client";

import React, { useState, useEffect } from "react";
import styles from "./AdminNavbar.module.scss";
import { Button, InputField, Logo } from "@/shared";
import { ArrowDownIcon, LogoIcon, NotificationIcon } from "@/shared/svgs/dashboard";
import Image from "next/image";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import WishlistComponent from "../WishlistComponent/WishlistComponent";
import { useAdminAuth } from "@/contexts/AuthContext/AdminAuthContext";

const AdminNavbar = () => {
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const [showMenubar, setShowMenubar] = useState<boolean>(false);
	const [showDropDown, setShowDropDown] = useState(false);
	const [showWishList, setShowWishList] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		// Function to handle click events
		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// Check if the click happened outside the specified elements
			if (
				!target.closest(".drop-down-menu-class") &&
				!target.closest(".drop-down-icon-class")
			) {
				setShowDropDown(false);
			}
		};

		// Add event listener to the document
		document.addEventListener("click", handleClick);

		// Clean up the event listener
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div className={styles.navbar_container}>
			<div className={styles.logo_icon}>
				<Link href="/">
					<Logo type="dark" />
				</Link>
			</div>

			<div className={styles.icons_container}>
				<div className={styles.mob_buttons}>
					<Button
						buttonType="transparent"
						className={`${styles.small_icon} ${styles.circle_border}`}
					>
						<Image
							src={"/svgs/notification.svg"}
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
				<Button
					buttonType="transparent"
					className={`${styles.small_icon} ${styles.circle_border}`}
				>
					<Image
						src={"/svgs/notification.svg"}
						height={70}
						width={70}
						alt=""
						sizes="100vw"
					/>
				</Button>
				<div className={styles.details_items}>
					<div className={styles.avatar}>
						<Image
							src={!!user?.avatar ? user.avatar : "/svgs/avatar-user.svg"}
							width={40}
							height={40}
							alt="avatar"
						/>
					</div>
					<span className={styles.name}>{user?.userName ?? "Guest"}</span>
					<span
						className={`${styles.drop_down_icon} drop-down-icon-class`}
						onClick={() => setShowDropDown(true)}
					>
						<ArrowDownIcon />
					</span>
					<MenuDropDown
						showDropDownMenu={showDropDown}
						setShowWishList={setShowWishList}
					/>
				</div>
			</div>

			{showMenubar && (
				<div className={styles.sidemenu_container}>
					<AdminSidebar
						isMobile={true}
						onClose={() => setShowMenubar(!showMenubar)}
						setShowWishList={setShowWishList}
					/>
				</div>
			)}
			<WishlistComponent
				showWishList={showWishList}
				setShowWishList={setShowWishList}
			/>
		</div>
	);
};

export default AdminNavbar;

const MenuDropDown = ({
	showDropDownMenu,
	setShowWishList
}: {
	showDropDownMenu: boolean;
	setShowWishList: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { user } = useAuth();
	return (
		<div
			className={`${styles.drop_down_menu_container} drop-down-menu-class`}
			data-show={showDropDownMenu}
		>
			<ul className={styles.menu_container}>
				<li className={styles.menu_item}>
					<Image
						src={!!user?.avatar ? user.avatar : "/svgs/avatar-user.svg"}
						alt="user-icon"
						height={32}
						width={32}
						className={styles.avatar}
					/>
					<div>
						<h3 className={styles.user_name}>{user?.userName}</h3>
						<p className={styles.email}>{user?.email}</p>
					</div>
				</li>
				<Link href={`/users/${user?._id}`} className={styles.menu_item}>
					<Image src="/svgs/user.svg" alt="user-icon" height={32} width={32} />
					<h3>Profile</h3>
				</Link>
				<li
					className={`${styles.menu_item} ${styles.cursor} wishlist_icon`}
					onClick={() => setShowWishList(true)}
				>
					<Image src="/svgs/star.svg" alt="user-icon" height={32} width={32} />
					<h3>Wishlist</h3>
				</li>
			</ul>
		</div>
	);
};
