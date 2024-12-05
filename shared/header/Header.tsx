"use client";

import { navLinks } from "@/mock";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Logo, Button } from "@/shared";
import styles from "./Header.module.scss";
import Image from "next/image";
import { NavLink, NavLinkMenu, NavLinkSub } from "@/interfaces";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "@/contexts/AppContext";
import { AppState, useAppDispatch, useAppSelector } from "@/store/configureStore";
import { useAuth } from "@/contexts/AuthContext";
import useCart from "@/hooks/useCart";

enum Scroll {
	Idle = "idle",
	InitialScroll = "initial",
	FinalScroll = "final"
}

const Header = () => {
	const { heroHeight }: any = useGlobalContext();
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [scroll, setScroll] = useState<Scroll>(Scroll.Idle);
	const [isBackground, setIsBackground] = useState<boolean>(false);
	const headerRef: any = useRef(null);
	const user = useAppSelector((state: AppState) => state.user);
	const router = useRouter();
	const pathName = usePathname();
	const dispatch = useAppDispatch();
	const homePath = pathName === "/";
	const { getCartItems } = useCart();
	const cartItems = getCartItems();
	useEffect(() => {
		const headerHeight: any = headerRef.current?.offsetHeight;
		// dispatch(clearNewListing());
		const scrollCheck = () => {
			const currentScrollY = window.scrollY;

			if (homePath) {
				if (currentScrollY > headerHeight) {
					setScroll(Scroll.InitialScroll);
				}
				if (currentScrollY <= headerHeight) setScroll(Scroll.Idle);
				if (currentScrollY >= heroHeight) setScroll(Scroll.FinalScroll);
			}
		};
		if (!homePath) {
			setScroll(Scroll.FinalScroll);
		} else {
			setScroll(Scroll.Idle);
		}
		window.addEventListener("scroll", scrollCheck, { passive: true });

		return () => window.removeEventListener("scroll", scrollCheck);
	}, [heroHeight, homePath]);

	const handleLogoShown = () =>
		!collapsed || scroll === Scroll.FinalScroll ? "dark" : "light";

	return (
		<header
			className={styles.header}
			data-collapsed={!collapsed || scroll === Scroll.FinalScroll}
			ref={headerRef}
			data-scroll={scroll}
			data-background={isBackground}
		>
			<div className={styles.background}></div>
			<Link href="/">
				<div className={styles.header_logoContainer}>
					<Logo type={handleLogoShown()} />
				</div>
			</Link>
			<div
				className={
					styles[!collapsed ? "header_wrapper" : "header_wrapper__collapsed"]
				}
			>
				<nav className={styles.header_nav}>
					<ul className={styles.header_navList}>
						{navLinks.map((link: NavLink, index: number) => {
							return (
								<LinkItem
									setCollapsed={setCollapsed}
									collapsed={collapsed}
									setIsBackground={setIsBackground}
									link={link}
									router={router}
									key={index}
								/>
							);
						})}
					</ul>
				</nav>
				<div className={styles.button_container}>
					<Button buttonType="transparent" className={styles.small_icon}>
						<div>
							<Image
								src={
									scroll === Scroll.FinalScroll
										? "/svgs/icon-search-dark.svg"
										: "/svgs/icon-search.svg"
								}
								fill
								alt=""
								sizes="100vw"
							/>
						</div>
					</Button>
					<Button
						buttonType="transparent"
						className={styles.cart_icon}
						onClick={() => router.push("/cart")}
						data-cart={!!cartItems?.items.length}
					>
						<div>
							<Image
								src={
									scroll === Scroll.FinalScroll
										? "/svgs/icon-cart-dark.svg"
										: "/svgs/icon-cart.svg"
								}
								fill
								alt=""
								sizes="100vw"
							/>
						</div>
						{cartItems?.items.length ? (
							<div className={styles.cart}>
								<p>{cartItems?.items.length}</p>
							</div>
						) : null}
					</Button>
					{user.isAuthenticated ? (
						<Link
							className={styles.user_account}
							href={user.isAdmin ? "/admin/dashboard" : "/user/dashboard"}
						>
							<Button
								onClick={() => setCollapsed(!collapsed)}
								className={styles.my_account}
							>
								My account
							</Button>
						</Link>
					) : (
						<>
							<Button
								buttonType="transparent"
								className={styles.trans_button}
							>
								<Link href={"/login"}>Login</Link>
							</Button>
							<Button className={styles.button}>
								<Link href={"/signup"}>Sign Up</Link>
							</Button>
						</>
					)}
				</div>
			</div>
			<div className={styles.mob_buttons}>
				<Button buttonType="transparent" className={styles.small_icon}>
					<div>
						<Image
							src={
								!collapsed || scroll === Scroll.FinalScroll
									? "/svgs/icon-search-dark.svg"
									: "/svgs/icon-search.svg"
							}
							fill
							alt=""
							sizes="100vw"
						/>
					</div>
				</Button>
				<Button buttonType="transparent" className={styles.small_icon}>
					<Link href="/cart">
						<Image
							src={
								!collapsed || scroll === Scroll.FinalScroll
									? "/svgs/icon-cart-dark.svg"
									: "/svgs/icon-cart.svg"
							}
							fill
							alt=""
							sizes="100vw"
						/>
					</Link>
				</Button>
				<div
					onClick={() => setCollapsed(!collapsed)}
					className={
						styles[collapsed ? "header_hamburger" : "header_hamburger__open"]
					}
				>
					<span className={styles.header_hamburgerBar}></span>
					<span className={styles.header_hamburgerBar}></span>
				</div>
			</div>
		</header>
	);
};

export default Header;

interface LinkProps {
	link: NavLink;
	router: any;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
	collapsed: boolean;
	setIsBackground: React.Dispatch<React.SetStateAction<boolean>>;
}
const LinkItem = ({
	link,
	router,
	setCollapsed,
	collapsed,
	setIsBackground
}: LinkProps) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const handleDropdown = (label: string) => {
		if (label !== "blog") {
			setIsActive(!isActive);
		}
	};
	const showBackground = () => {
		if (!!link.subMenu) {
			setIsBackground(true);
		}
	};
	return (
		<li
			className={styles.header_navLink}
			data-active={isActive}
			onMouseEnter={showBackground}
			onMouseLeave={() => setIsBackground(false)}
		>
			{link.label === "blog" ? (
				<Link
					href={link.href}
					className={styles.link_row}
					onClick={() => setCollapsed(!collapsed)}
				>
					<div className={styles.link_icon}>
						<Image src={link.icon} fill alt="" sizes="100vw" />
					</div>
					<p>{link.label}</p>
				</Link>
			) : (
				<>
					<div
						className={styles.link_row}
						onClick={() => handleDropdown(link.label)}
					>
						<div className={styles.link_icon}>
							<Image src={link.icon} fill alt="" sizes="100vw" />
						</div>
						<p>{link.label}</p>
					</div>
					{link.subMenu && (
						<div
							className={styles.mob_chevron}
							onClick={() => handleDropdown(link.label)}
						>
							<Image src="/svgs/chevron.svg" fill alt="" sizes="100vw" />
						</div>
					)}
					{link.subMenu && (
						<div
							className={styles.subMenu_container}
							data-active={
								link.label === "sell gears" || link.label === "rent out"
							}
						>
							<div className={styles.subMenu}>
								<div className={styles.container}>
									{link.title && (
										<div className={styles.subMenu_title}>
											<h1>{link.title}</h1>
											<p>{link.description}</p>
										</div>
									)}
									{link.button && (
										<Button
											className={styles.link_button}
											onClick={() => router.push(link.href)}
										>
											<div className={styles.icon_plus}>
												<Image
													src="/svgs/icon-plus.svg"
													alt=""
													fill
													sizes="100vw"
												/>
											</div>
											<p>{link.button}</p>
										</Button>
									)}
									{link.subMenu.map(
										(subMenu: NavLinkSub, index: number) => (
											<ul
												className={styles.subMenu_navlist}
												key={index}
											>
												<h2>{subMenu.label}</h2>
												{subMenu.menu.map(
													(
														menu: NavLinkMenu,
														index: number
													) => (
														<Link
															href={menu.href}
															key={index}
															className={
																styles.subMenu_link
															}
															onClick={() => {
																setCollapsed(!collapsed);
																setIsActive(false);
															}}
														>
															{menu.icon && (
																<div
																	className={
																		styles.subMenu_icon
																	}
																>
																	<Image
																		src={menu.icon}
																		fill
																		alt=""
																		sizes="100vw"
																	/>
																</div>
															)}
															<p>{menu.label}</p>
														</Link>
													)
												)}
											</ul>
										)
									)}
								</div>
								<div className={styles.youtube_banner}>
									<Image
										src="/svgs/youtube-banner.svg"
										fill
										alt="youtube"
										sizes="100vw"
									/>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</li>
	);
};
