"use client";
import React, { useEffect, useState } from "react";
import styles from "./AdminSidebar.module.scss";
import {
	BlogIcon,
	CategoriesNavIcon,
	CloseIcon,
	DashboardNavIcon,
	ListingsNavIcon,
	LocationEllipse,
	LogoIcon,
	LogoutNavIcon,
	MessagesNavIcon,
	SettingsNavIcon,
	ThirdPartyCheckIcon,
	TransactionNavIcon,
	UserIcon,
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
			link: "/admin/dashboard"
		},
		{
			name: "Users",
			icon: <UserIcon />,
			link: "/admin/users"
		},
		{
			name: "Wallet",
			icon: <WalletNavIcon />,
			link: "/admin/wallet"
		},
		{
			name: "Transactions",
			icon: <TransactionNavIcon />,
			link: "/admin/transactions"
		},
		{
			name: "Listings",
			icon: <ListingsNavIcon />,
			link: "/admin/listings"
		},
		{
			name: "Third party check",
			icon: <ThirdPartyCheckIcon />,
			link: "/admin/third-party-check"
		},
		{
			name: "Blog",
			icon: <BlogIcon />,
			link: "/admin/blog"
		}
	];
	const [active, setActive] = useState("/admin/dashboard");

	useEffect(() => {
		const absPath = pathname.split("?")[0].split("/").slice(0, 3).join("/");
		console.log(absPath);
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
						<span className={styles.location_icon}>
							<LocationEllipse />
						</span>
						<div>
							<h4>username</h4>
							<Link href="/admin/settings">View Profile</Link>
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
						href="/admin/settings?q=profile"
						className={styles.navlinks_container__item}
						data-active={active === "/admin/settings"}
						onClick={onClose}
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
