import React from 'react'
import styles from './CartView.module.scss'
import { CartItems } from '@/components/CartComponent'
import BreadCrumb from '@/shared/breadCrumb/BreadCrumb'

const CartView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <BreadCrumb />
                <h2 className={styles.cart_title}>My cart overview</h2>
                <CartItems />
            </div>
        </div>
    )
}

export default CartView