import React from "react";
import styles from "./About.module.scss";

const About = ({ data }: any) => {
	return (
		<div className={styles.container}>
			<h2>About</h2>
			<p>
				{data.about}
				{/* <span className={styles.read_more}>Read more</span> */}
			</p>
		</div>
	);
};

export default About;
