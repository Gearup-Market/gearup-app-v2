'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import styles from './BreadCrumb.module.scss';
import Image from 'next/image';

const BreadCrumb = () => {
	const router = useRouter();
	const pathname = usePathname();
	const path = pathname.split('/');
	const path2 = pathname.split('/');
	path2.pop();
	path2.shift();

	return (
		<div className={styles.breadcrumb}>
			<Link href={`/`} className={styles.text}>
				<span>
					home
				</span>
			</Link>
			<Image src='/svgs/arrow-right.svg' alt='chevron-right' width={10} height={10} />
			<div className={styles.text}>
				<h6> {path.slice(-1)} </h6>
			</div>
		</div>
	);
};

export default BreadCrumb;
