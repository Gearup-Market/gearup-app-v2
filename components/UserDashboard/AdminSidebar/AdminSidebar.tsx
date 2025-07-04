"use client";
import React, { useEffect, useState } from "react";
import styles from "./AdminSidebar.module.scss";
import {
	CategoriesNavIcon,
	CloseIcon,
	DashboardNavIcon,
	ListingsNavIcon,
	LogoutNavIcon,
	MessagesNavIcon,
	SettingsNavIcon,
	TransactionNavIcon,
	WalletNavIcon
} from "@/shared/svgs/dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/shared";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { useAppSelector } from "@/store/configureStore";

interface Props {
	isMobile?: boolean;
	onClose?: () => void;
	setShowWishList?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSidebar = ({ isMobile, onClose, setShowWishList }: Props) => {
	const pathname = usePathname();
	const { logout } = useAuth();
	const user = useAppSelector(state => state.user);
	const sidebarItems = [
		{
			name: "Dashboard",
			icon: <DashboardNavIcon />,
			link: "/user/dashboard"
		},
		{
			name: "Transactions",
			icon: <TransactionNavIcon />,
			link: "/user/transactions?type=rent"
		},
		{
			name: "Messages",
			icon: <MessagesNavIcon />,
			link: "/user/messages"
		},
		{
			name: "Listings",
			icon: <ListingsNavIcon />,
			link: "/user/listings?type=rent"
		},
		{
			name: "Categories",
			icon: <CategoriesNavIcon />,
			link: "/user/categories"
		},
		{
			name: "Wallet",
			icon: <WalletNavIcon />,
			link: "/user/wallet"
		}
	];
	const [active, setActive] = useState("/user/dashboard");

	useEffect(() => {
		const absPath = pathname.split("?")[0].split("/").slice(0, 3).join("/");
		setActive(absPath);
	}, [pathname]);

	return (
		<div className={styles.sidebar_container}>
			<div className={styles.sidebar_container__header}>
				<Link href="/">
					<Logo type="dark" />
				</Link>
				{isMobile && (
					<span onClick={onClose}>
						<CloseIcon />
					</span>
				)}
			</div>

			{isMobile && (
				<div className={styles.sidebar_container__customer_container}>
					<h3 className={styles.title}>Profile</h3>
					<div className={styles.location_details}>
						<div className={styles.avatar}>
							<Image
								src={
									!!user?.avatar ? user.avatar : "/svgs/avatar-user.svg"
								}
								width={40}
								height={40}
								alt="avatar"
							/>
						</div>
						<div>
							<h4>{user?.userName}</h4>
							<Link href={`/users/${user?._id}`}>View Profile</Link>
						</div>
					</div>
				</div>
			)}
			<div className={styles.navlinks_wrapper}>
				<ul className={styles.navlinks_container}>
					{sidebarItems.map((item, index) => (
						<Link
							key={index}
							data-active={active === item.link.split("?")[0]}
							href={item.link}
							className={styles.navlinks_container__item}
							onClick={onClose}
						>
							<span className={styles.icon}>{item.icon}</span>
							<span className={styles.title}>{item.name}</span>
						</Link>
					))}
				</ul>

				<ul className={`${styles.navlinks_container} ${styles.btn_container}`}>
					<li
						className={`${styles.navlinks_container__item} ${styles.cursor} ${styles.wishlist_nav} wishlist_icon`}
						onClick={() => {
							setShowWishList && setShowWishList(true);

							onClose && onClose();
						}}
					>
						<Image
							src="/svgs/star.svg"
							alt="user-icon"
							height={32}
							width={32}
						/>
						<h3>Wishlist</h3>
					</li>
					<Link
						href="/user/settings?q=payments"
						className={styles.navlinks_container__item}
						data-active={active === "/user/settings"}
						onClick={onClose}
					>
						<span className={styles.icon}>
							<SettingsNavIcon />
						</span>
						<p>Settings</p>
					</Link>
					<div className={styles.navlinks_container__item} onClick={logout}>
						<span className={styles.icon}>
							<LogoutNavIcon />
						</span>
						<p className={styles.logout_text}>Logout</p>
					</div>
				</ul>
			</div>
		</div>
	);
};

export default AdminSidebar;
