'use client'
import { HeaderSubText } from '@/components/Admin';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import styles from './UrlPath.module.scss'
import Image from 'next/image';

interface Props {
    checkUrl?: boolean;
}

const UrlPath = ({ checkUrl }: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const editingMode = useSearchParams().get('edit_mode');

    const paths = ["/admin/dashboard", "/admin/users", "/admin/wallet", "/admin/transactions", "/admin/listings", "/admin/third-party-check", "/admin/blog"];
    const newPathname = pathname.split('/')[2].replace(/-/g, ' ');

    if (checkUrl && !paths.includes(pathname)) {
        return null
    }
    return (
        <div className={styles.container}>
            {
                newPathname.toLowerCase() === 'blog' && !paths.includes(pathname) ?
                    <>
                        <p onClick={() => router.back()} className={styles.close_icon}>
                            <Image
                                src="/svgs/icon-close.svg"
                                alt="blog"
                                width={16}
                                height={16}
                            />
                        </p>
                        <HeaderSubText title={editingMode ? "Edit blog article":'New blog article'} variant="normal" />
                    </>
                    :
                    <HeaderSubText title={`${newPathname.toLowerCase() === 'blog' ? `${newPathname} Articles` : newPathname}`} variant="normal" />
            }
        </div>
    )
}

export default UrlPath