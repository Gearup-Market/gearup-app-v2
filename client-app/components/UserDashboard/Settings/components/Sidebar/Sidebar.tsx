'use client'
import React from 'react'
import styles from './Sidebar.module.scss'
import Link from 'next/link';
import Image from 'next/image';


interface ListProps {
    name: string;
    id: number;
    path: string;
    slug: string;
    icon: string;

}

interface Props {
    settingsLists: ListProps[];
    active: string;
}

const Sidebar = ({ settingsLists, active }: Props) => {



    return (
        <div className={styles.wrapper}>

            <div className={styles.sidebar_container}>
                <ul className={styles.navlinks_container}>
                    {settingsLists.map((item, index) => (
                        <Link key={index} data-active={active === item.slug} href={item.path} className={styles.navlinks_container__item} >
                            <span className={styles.icon}>
                                <Image src={item.icon} alt={item.name} height={50} width={50} />
                            </span>
                            <h2 className={styles.title}>{item.name}</h2>
                        </Link>
                    ))}
                </ul>
            </div>
            <ul className={styles.parent_container}>
                {
                    settingsLists.map((item) => (
                        <Link data-active={active === item.slug} href={item.path} key={item.id} className={styles.filter}>
                            <p>{item.name}</p>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default Sidebar