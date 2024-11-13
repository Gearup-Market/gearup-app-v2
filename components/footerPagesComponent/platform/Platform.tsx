"use client";

import styles from "./Platform.module.scss";
import { Button, Title } from "@/shared";
import Link from "next/link";
import Image from "next/image";

interface Data {
	title: string;
	description: string;
	id: number;
}

interface Props {
	title: string;
	description: string;
	image: string;
	data: Data[];
	type?: "default" | "rent" | "buy";
	href: string;
	button: string;
}

const Platform = ({
	title,
	description,
	image,
	data,
	type = "default",
	href,
	button
}: Props) => {
	return (
		<section className={styles.section}>
			<div className={styles.row}>
				<div className={styles.block}>
					<h3>How it works</h3>
					<Title
						title={title}
						description={description}
						className={styles.title}
					/>
					<div className={styles.image} data-type={type}>
						<Image src={image} fill alt="" sizes="100vw" />
					</div>
				</div>
				<div className={styles.box_container}>
					{data.map(({ id, title, description }: Data, index: number) => (
						<Box
							id={id}
							title={title}
							description={description}
							key={index}
						/>
					))}
					<Link href={href}>
						<Button className={styles.button}>
							<p>{button}</p>
							<div className={styles.icon}>
								<Image src="/svgs/arrow.svg" fill alt="" sizes="100vw" />
							</div>
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Platform;

const Box = ({ id, title, description }: Data) => {
	return (
		<div className={styles.box}>
			<div className={styles.number_box}>
				<p>{id}</p>
			</div>
			<Title
				title={title}
				description={description}
				titleType="small"
				titleClassName={styles.box_title}
			/>
		</div>
	);
};
