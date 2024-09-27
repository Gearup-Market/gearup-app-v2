import React from "react";
import styles from "./Categories.module.scss";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import { categoriesList } from "./components/utils/data";
import Image from "next/image";
import { Button } from "@/shared";
import Link from "next/link";

const Categories = () => {
	return (
		<div className={styles.container}>
			<HeaderSubText
				title="Categories"
				description="Select a catergory that you have interest in and view gears in those categories specifically"
				variant="main"
			/>

			<div className={styles.container__categories_container}>
				{categoriesList.map((category, index) => (
					<div key={index} className={styles.category}>
						<div className={styles.category__image}>
							<Image
								src={category.image}
								alt={category.name}
								height={150}
								width={150}
							/>
						</div>
						<h3 className={styles.category__title}>{category.name}</h3>
						<p className={styles.gears}>{category.no_of_items} Gears</p>
						<Link href={`/rent?category=${category.name.toLowerCase()}`}>
							<Button buttonType="secondary" className={styles.button}>
								View Gears
							</Button>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories;
