import React, { ReactNode } from "react";
import styles from "./CustomLink.module.scss";
import Link from "next/link";

interface Props {
	href?: string;
	title?: string;
	isExternal?: boolean;
	children?: ReactNode;
}

const CustomLink = ({ href = "/", title, isExternal = false, children }: Props) => {
	return (
		<div>
			{isExternal ? (
				<a href={href} rel="noreferrer" target="_blank">
					{title}
					{children}
				</a>
			) : (
				<Link href="/">
					{title}
					{children}
				</Link>
			)}
		</div>
	);
};

export default CustomLink;
