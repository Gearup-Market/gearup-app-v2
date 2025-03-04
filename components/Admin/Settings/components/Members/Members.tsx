"use client";
import React, { useMemo, useState } from "react";
import styles from "./Members.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { GridAddIcon } from "@mui/x-data-grid";
import { Button } from "@/shared";
import MembersTable from "./MembersTable/MembersTable";
import Image from "next/image";
import { UserIcon } from "@/shared/svgs/dashboard";
import AddMember from "./AddMember/AddMember";
import { useGetAdminMembers } from "@/app/api/hooks/Admin/users";
import { PageLoader } from "@/shared/loaders";

const lists = [
	{
		id: 1,
		title: "Customer Support",
		icon: "/svgs/customer-support.svg"
	},
	{
		id: 2,
		title: "Super Admin",
		icon: "/svgs/super-admin.svg"
	},
	{
		id: 3,
		title: "Admin",
		icon: "/svgs/admin-svg 2.svg"
	}
];

const Members = () => {
	const [openModal, setOpenModal] = useState(false);
	const { data, refetch } = useGetAdminMembers();
	const noMembers = true;

	const memberData = useMemo(() => {
		if (!data?.data) return { members: [], roles: [] };

		const rolesMap = new Map(
			data.data.map(
				({
					_id,
					roleName,
					permissions,
					createdAt,
					updatedAt,
					totalMembers
				}: any) => [
						_id,
						{ roleName, permissions, createdAt, updatedAt, totalMembers }
					]
			)
		);

		const members = data.data.flatMap((item: any) =>
			(item.members || []).map((member: any, ind: number) => ({
				...member,
				id: `${member._id}-${ind}-${Math.floor(Math.random() * (965 - 45 + 1)) + 45}`,
				role: rolesMap.get(member.role) || null
			}))
		);


		const roles = Array.from(rolesMap.values());

		return { members, roles };
	}, [data]);

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<div className={styles.header}>
					<div className={styles.header_title}>
						<HeaderSubText title="Members" variant="main" />
					</div>

					<Button
						buttonType="primary"
						className={`${styles.transparent_btn} ${styles.btn}`}
						onClick={() => setOpenModal(true)}
					>
						<span className={styles.icon}>
							<GridAddIcon className={styles.icon} />{" "}
						</span>
						New member
					</Button>
				</div>
				<ul className={styles.members_list}>
					{memberData.roles.map((item: any, index) => (
						<li key={index} className={styles.member}>
							<Image
								width={50}
								height={50}
								src={"/svgs/user.svg"}
								alt={item.roleName}
								className={styles.avatar}
							/>
							<div className={styles.title_container}>
								<span className={styles.title}>{item.roleName}</span>
								<p className={styles.amount}>{item.totalMembers}</p>
							</div>
						</li>
					))}
				</ul>
				{data ? (
					!data.data.length ? (
						<div className={styles.no_members}>
							<span className={styles.icon}>
								{" "}
								<UserIcon color="#F76039" />
							</span>
							<div>
								<h3>No members found</h3>
								<p>Add new members to ease your workflow</p>
							</div>
							<Button
								buttonType="primary"
								className={`${styles.transparent_btn} ${styles.btn}`}
								onClick={() => setOpenModal(true)}
							>
								<span className={styles.add_icon}>
									<GridAddIcon className={styles.add_icon} />{" "}
								</span>
								New member
							</Button>
						</div>
					) : (
						<MembersTable members={memberData.members} refetch={refetch} />
					)
				) : (
					<PageLoader />
				)}
			</div>
			<AddMember openModal={openModal} setOpenModal={setOpenModal} />
		</div>
	);
};

export default Members;
