import React from "react";
import styles from "./Title.module.scss";

interface Props {
	title?: string;
	titleType?: "small" | "medium" | "large";
	className?: string;
	description?: string;
	titleClassName?: string;
	descriptionClassName?: string;
}

const Title = ({
	title,
	titleType = "medium",
	className,
	description,
	titleClassName,
	descriptionClassName,
}: Props) => {
	return (
		<div className={`${styles.container} ${className}`}>
			<div className={`${styles.title} ${titleClassName}`} data-type={titleType}>
				<h1> {title}</h1>
			</div>
			{description && (
				<div
					className={`${styles.description} ${descriptionClassName}`}
					data-type={titleType}
				>
					<p>{description}</p>
				</div>
			)}
		</div>
	);
};

export default Title;
