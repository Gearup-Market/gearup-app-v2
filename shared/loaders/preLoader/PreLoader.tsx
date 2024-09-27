import React from 'react';
import Image from 'next/image';
import styles from './PreLoader.module.scss';

const PreLoader = () => {
	return (
		<div className={styles.preloader}>
			<div className={styles.loader}></div>
			<div className={styles.icon_container}>
				<div className={styles.icon}>
					<Image
						src="/svgs/icon-deftify.svg"
						layout="fill"
						loading="eager"
						priority={true}
						quality={100}
						alt="deftify"
					/>
				</div>
			</div>
		</div>
	);
};

export default PreLoader;
