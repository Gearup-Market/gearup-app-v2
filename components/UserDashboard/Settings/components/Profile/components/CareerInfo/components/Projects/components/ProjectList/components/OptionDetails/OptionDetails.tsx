'use client'
import React from 'react'
import styles from './OptionDetails.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

interface MoreModalProps {
    row?: any;
    onClose?: () => void;
    containerRef?: HTMLDivElement
    refetch?: () => void
}
enum MoreModalActions {
    EDIT = 1,
    PREVIEW = 2,
    DELETE = 3
}

const lists = [
    {
        id: MoreModalActions.PREVIEW,
        title: 'View project',
        icon: '/svgs/eye.svg'
    },
    {
        id: MoreModalActions.EDIT,
        title: 'Edit',
        icon: '/svgs/edit.svg'
    },
    {
        id: MoreModalActions.DELETE,
        title: 'Delete',
        icon: '/svgs/red-trash.svg'
    }

]

const MoreModal = ({ row, onClose, containerRef, refetch }: MoreModalProps) => {
    const router = useRouter()

    const handleActions = async (id: number) => {
        switch (id) {
            case MoreModalActions.EDIT:
                console.log("edit ")
                break;
            case MoreModalActions.PREVIEW:
                console.log("preview ")
                break;
            case MoreModalActions.DELETE:
                console.log("deleted")
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