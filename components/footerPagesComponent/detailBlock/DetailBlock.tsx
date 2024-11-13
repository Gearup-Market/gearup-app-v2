import React from "react";
import styles from "./DetailBlock.module.scss";
import { Title } from "@/shared";

interface Props {
	title: string;
	description: string;
	list: { title: string; description: string }[];
}

const DetailBlock = ({ title, description, list }: Props) => {
	return (
		<div className={styles.section}>
			<div className={styles.container}>
				<Title title={title} description={description} />
				<ul className={styles.list}>
					{list.map(item => (
						<li key={item.title} className={styles.list_item}>
							<span>{item.title}:</span> {item.description}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DetailBlock;
