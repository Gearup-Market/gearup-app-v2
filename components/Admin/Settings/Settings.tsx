"use client";
import React, { useEffect, useState } from "react";
import { Members, Profile, RolesPermission, Sidebar } from "./components";
import styles from "./Settings.module.scss";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import HeaderSubText from "../HeaderSubText/HeaderSubText";


const Settings = () => {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("q");
	const [active, setActive] = useState<string>("/admin/settings?q=profile");
	const router = useRouter();
	const pathname = usePathname();



	useEffect(() => {
		setActive(searchQuery ?? "profile");
		if (!searchQuery) {
			router.push(`${pathname}?q=profile`)
		}
	}, [searchQuery]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.header_title}>
					<HeaderSubText title="Settings" variant="normal" />
				</div>
				<Sidebar settingsLists={settingsLists} active={active} />
				<div className={styles.content}>
					{searchQuery === "profile" && <Profile />}
					{searchQuery === "members" && <Members />}
					{searchQuery === "roles-permissions" && <RolesPermission />}
				</div>
			</div>
		</div>
	);
};

export default Settings;


const settingsLists = [
	{
		id: 1,
		name: "Profile",
		path: "/admin/settings?q=profile",
		slug: "profile",
		description: "Create your profile as a Super Admin"
	},
	{
		id: 2,
		name: "Members",
		path: "/admin/settings?q=members",
		slug: "members",
		description: "Add & Manage gearup members"
	},

	{
		id: 4,
		name: "Roles & Permissions",
		path: "/admin/settings?q=roles-permissions",
		slug: "roles-permissions",
		description: "Grant special roles and permissions"
	}
];