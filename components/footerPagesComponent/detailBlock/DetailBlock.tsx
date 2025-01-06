import React from "react";
import styles from "./DetailBlock.module.scss";
import { Title } from "@/shared";

interface Props {
	title?: string;
	description?: string;
	list?: { title?: string; description: string }[];
	titleType?: "medium" | "small";
}

const DetailBlock = ({ title, description, list, titleType = "medium" }: Props) => {
	return (
		<div className={styles.section}>
			<div className={styles.container}>
				<Title title={title} description={description} titleType={titleType} />
				{list && (
					<ul className={styles.list}>
						{list.map(item => (
							<li
								key={item.title || item.description}
								className={styles.list_item}
							>
								{item.title && <span>{item.title}:</span>}{" "}
								{item.description}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default DetailBlock;
