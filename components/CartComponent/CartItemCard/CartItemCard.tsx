'use client';
import React, { useState } from 'react'
import styles from './CartItemCard.module.scss'
import { Button, CustomImage } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';

interface CartItemCardContainerProps {
    mainHeaderImage?: string;
    name?: string;
    children?: React.ReactNode;
    handleDeleteItem: (id: number) => void;
    id: number;
    type: string;
}

const CartItemCardContainer = ({ mainHeaderImage, id, name, handleDeleteItem, children, type }: CartItemCardContainerProps) => {
    const [showDetails, setShowDetails] = useState<boolean>(false)

    return (

        <div className={styles.cart_item_card}>
            <div className={styles.container}>
                <div className={styles.container__header}>
                    <div className={styles.container__header__left}>
                        <div className={styles.avatar}>
                            <CustomImage src={mainHeaderImage || "/images/admin-img.jpg"} alt={name || "custom-image"} fill />
                        </div>
                        <div className={styles.container__header__left__name_amount} >
                            <p className={styles.name}>{name}</p>
                        </div>
                    </div>
                    <span className={styles.container__header__icon} data-rotate={showDetails} onClick={() => setShowDetails((prev) => !prev)}>
                        <Image src={'/svgs/chevron.svg'} alt={"toggle-icon"} width={16} height={16} />
                    </span>
                </div>
                {
                    showDetails && (
                        <div className={styles.container__body} data-show={showDetails}>
                            {children}
                            <div className={styles.buttons_container}>
                                <Button className={styles.place_btn} iconSuffix='/svgs/arrow-right2.svg' >
                                    <Link href={`/checkout?type=${type}`}>
                                        Place order
                                    </Link>
                                </Button>
                                <Button buttonType='transparent' className={styles.delete_btn} iconPrefix='/svgs/red-trash.svg' onClick={() => handleDeleteItem(id)}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>

    )
}

export default CartItemCardContainer