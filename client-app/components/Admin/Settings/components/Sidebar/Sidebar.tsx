'use client'
import React, { useState } from 'react'
import styles from './Sidebar.module.scss'
import Link from 'next/link';
import { UserSideIcon } from '@/shared/svgs/dashboard';


interface ListProps {
    name: string;
    id: number;
    path: string;
    slug: string;
    description: string;

}

interface Props {
    settingsLists: ListProps[];
    active: string;
}

const Sidebar = ({ settingsLists, active }: Props) => {
    const [activeFilterId, setActiveFilterId] = useState(1)


    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar_container}>
                <ul className={styles.navlinks_container}>
                    {settingsLists.map((item, index) => (
                        <Link key={index} data-active={active === item.slug} href={item.path} className={styles.navlinks_container__item} >
                            <span className={styles.icon}>
                                <UserSideIcon color={active === item.slug ? "#1B1E21" : "#A4A6A7"} />
                            </span>
                            <div>
                                <h2 className={styles.title}>{item.name}</h2>
                                <p className={styles.description}>{item.description}</p>
                            </div>
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