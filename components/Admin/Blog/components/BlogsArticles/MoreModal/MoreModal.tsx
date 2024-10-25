'use client'
import React, { RefObject, useEffect } from 'react'
import styles from './MoreModal.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useDeleteBlogById } from '@/app/api/hooks/blogs';
import toast from 'react-hot-toast';

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

const MoreModal = ({ row, onClose, containerRef, refetch }: MoreModalProps) => {
    const router = useRouter()
    const {mutateAsync: deleteBlogById} = useDeleteBlogById()

    const handleActions = async(id: number) => {
        switch (id) {
            case MoreModalActions.EDIT:
                router.push(`/admin/blog/new-blog?edit_mode=true&blog_id=${row._id}`)
                break;
            case MoreModalActions.PREVIEW:
                router.push(`/blog/${row._id}`)
                break;
            case MoreModalActions.DELETE:
                await deleteBlogById({blogId: row._id},{
                    onSuccess: () => {
                        toast.success('Blog deleted successfully')
                        refetch && refetch()
                        onClose && onClose()
                    },
                    onError: () => {
                        toast.error('Error deleting blog')
                    }
                    
                })
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