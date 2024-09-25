import Link from "next/link";
import React from "react";
import styles from "./CustomBreadCrumbs.module.scss";
import { ChevronIcon } from "../svgs/dashboard";

interface Props {
    path1: string;
    path2: string;
}
const CustomBreadCrumbs = ({ path1, path2 }: Props) => {
    return (
        <div className={styles.breadcrumb_container}>
            <div className={styles.text_container}>
                <Link href={"/admin/categories"} className={styles.path1}>
                    {path1}
                </Link>
                <span className={styles.icon}>
                    <ChevronIcon color="#4E5054" />
                </span>
                <p className={styles.path2}>{path2}</p>
            </div>
        </div>
    );
};

export default CustomBreadCrumbs;
