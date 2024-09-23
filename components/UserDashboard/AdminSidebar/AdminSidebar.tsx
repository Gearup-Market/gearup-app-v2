"use client";
import React, { useEffect, useState } from "react";
import styles from "./AdminSidebar.module.scss";
import {
	CategoriesNavIcon,
	CloseIcon,
	DashboardNavIcon,
	ListingsNavIcon,
	LocationEllipse,
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

interface Props {
	isMobile?: boolean;
	onClose?: () => void;
}

const AdminSidebar = ({ isMobile, onClose }: Props) => {
	const pathname = usePathname();
	const { logout } = useAuth();
	const sidebarItems = [
		{
			name: "Dashboard",
			icon: <DashboardNavIcon />,
			link: "/user/dashboard"
		},
		{
			name: "Transactions",
			icon: <TransactionNavIcon />,
			link: "/user/transactions"
		},
		{
			name: "Messages",
			icon: <MessagesNavIcon />,
			link: "/user/messages"
		},
		{
			name: "Listings",
			icon: <ListingsNavIcon />,
			link: "/user/listings"
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
				<Logo type="dark" />
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
						<span className={styles.location_icon}>
							<LocationEllipse />
						</span>
						<div>
							<h4>username</h4>
							<Link href="/user/settings?q=profile">View Profile</Link>
						</div>
					</div>
				</div>
			)}
			<div className={styles.navlinks_wrapper}>
				<ul className={styles.navlinks_container}>
					{sidebarItems.map((item, index) => (
						<Link
							key={index}
							data-active={active === item.link}
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
					<Link
						href="/user/settings?q=payments"
						className={styles.navlinks_container__item}
						data-active={active === "/user/settings"}
					>
						<span>
							<SettingsNavIcon />
						</span>
						<p>Settings</p>
					</Link>
					<div className={styles.navlinks_container__item} onClick={logout}>
						<span>
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
