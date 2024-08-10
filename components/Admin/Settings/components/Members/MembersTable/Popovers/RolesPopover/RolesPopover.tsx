'use client'
import React from 'react'
import styles from './RolesPopover.module.scss';
import { CheckmarkIcon } from '@/shared/svgs/dashboard';

interface MoreModalProps {
    row?: any;
}

enum RolesEnum {

    CUSTOMER_SUPPORT = 1,
    ADMIN = 2,
    DESIGN = 3
}

const roles = [
    {
        id: RolesEnum.CUSTOMER_SUPPORT,
        title: 'customer support'
    },
    {
        id: RolesEnum.ADMIN,
        title: 'admin'
    },
    {
        id: RolesEnum.DESIGN,
        title: 'design'
    }
]

const RolesPopover = ({ row }: MoreModalProps) => {
    const [activeRole, setActiveRole] = React.useState<number | null>(1);

    const handleActions = (id: number) => {
        setActiveRole(id)
        switch (id) {
            case RolesEnum.CUSTOMER_SUPPORT:
                console.log(`editing ${row.title}`)
                break;
            case RolesEnum.ADMIN:
                console.log(`previewing ${row.title}`)
                break;
            case RolesEnum.DESIGN:
                console.log(`deleting ${row.title}`)
                break;
            default:
                break;
        }
    }
    return (
        <ul className={styles.container}>
            {
                roles.map(role => (
                    <li key={role.id} data-active={role.id === activeRole} className={styles.item} onClick={() => handleActions(role.id)}>
                        <p>{role.title}</p>
                        {
                            role.id === activeRole && (
                                <span className={styles.icon}>
                                    <CheckmarkIcon color='#FFB30F' />
                                </span>
                            )
                        }
                    </li>
                ))
            }
        </ul>
    )
}

export default RolesPopover