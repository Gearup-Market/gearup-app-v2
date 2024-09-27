'use client'
import React, { RefObject, useEffect } from 'react'
import styles from './MoreModal.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

interface MoreModalProps {
    row?: any;
    onClose?: () => void;
    containerRef?: HTMLDivElement
}
enum MoreModalActions {
    EDIT = 1,
    PREVIEW = 2,
    DELETE = 3
}

const lists = [
    {
        id: MoreModalActions.EDIT,
        title: 'Edit',
        icon: '/svgs/edit.svg'
    },
    {
        id: MoreModalActions.PREVIEW,
        title: 'Preview',
        icon: '/svgs/eye.svg'
    },
    {
        id: MoreModalActions.DELETE,
        title: 'Delete',
        icon: '/svgs/red-trash.svg'
    }

]

const MoreModal = ({ row, onClose, containerRef }: MoreModalProps) => {
    const router = useRouter()

    const handleActions = (id: number) => {
        console.log(id)
        switch (id) {
            case MoreModalActions.EDIT:
                console.log(`editing ${row.title}`)
                break;
            case MoreModalActions.PREVIEW:
                console.log(`previewing ${row.title}`)
                router.push(`/blog/${row.id}`)
                break;
            case MoreModalActions.DELETE:
                console.log(`deleting ${row.title}`)
                break;
            default:
                break;
        }
    }

    return (
        <ul className={styles.container}>
            {
                lists.map((list) => (
                    <li key={list.id} className={styles.item} onClick={() => handleActions(list.id)}>
                        <Image src={list.icon} height={20} width={20} alt={list.title} />
                        <p className={styles.text}>{list.title}</p>
                    </li>
                ))
            }
        </ul>
    )
}

export default MoreModal