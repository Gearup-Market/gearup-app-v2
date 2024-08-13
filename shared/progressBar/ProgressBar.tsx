import React from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressProps {
	height?: number;
	radius?: number;
	percent: number;
	className?: string;
<<<<<<< HEAD
	type?: "customized" | "default";
}

const ProgressBar = ({ height = 20, radius = 24, percent, className, type = "default" }: ProgressProps) => {
=======
}

const ProgressBar = ({ height = 20, radius = 24, percent, className }: ProgressProps) => {
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
	return (
		<div className={styles.progress}>
			<div
				className={`${styles.progress_inner} ${className}`}
				style={{ height: `${height / 10}rem`, borderRadius: `${radius / 10}rem` }}
<<<<<<< HEAD
				data-type={type}
			>
				<div
				data-type={type}
=======
			>
				<div
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
					className={styles.progress_bar}
					style={{
						width: `${percent}%`,
					}}
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
