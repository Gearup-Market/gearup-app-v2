import React from 'react'
import styles from './CartItems.module.scss'
import CartItemCardContainer from '../CartItemCard/CartItemCard'
import { CustomImage, Ratings } from '@/shared'

const cartItems = [
    {
        id: 1,
        name: 'Sony A7s II',
        price: 100,
        quantity: 2,
        image: '/images/product1.jpg',
        type: 'rental',
        rental_duration: '1 month',
        rental_price_days: 10,
        gearup_service_fee: 10,
        vat: 5,
        lender: {
            name: 'Jane Doe',
            image: '/images/seller.jpg',
            rating: 4.8
        }
    },
    {
        id: 2,
        name: 'Hollyland Solidcom C1-6S Intercoms 6x',
        price: 200,
        quantity: 1,
        image: '/images/product2.jpg',
        type: 'Gear sale',
        gearup_service_fee: 20,
        vat: 10,
        seller: {
            name: 'Einstein Doe',
            image: '/images/seller.jpg',
            rating: 4.5
        }
    },
    {
        id: 3,
        name: 'Sony A7s II',
        price: 100,
        quantity: 2,
        image: '/images/product1.jpg',
        type: 'rental',
        rental_duration: '1 month',
        rental_price_days: 10,
        gearup_service_fee: 10,
        vat: 5,
        lender: {
            name: 'Jane Doe',
            image: '/images/seller.jpg',
            rating: 4.8
        }
    },
    {
        id: 4,
        name: 'Hollyland Solidcom C1-6S Intercoms 6x',
        price: 200,
        quantity: 1,
        image: '/images/product2.jpg',
        type: 'Gear sale',
        gearup_service_fee: 20,
        vat: 10,
        seller: {
            name: 'Einstein Doe',
            image: '/images/seller.jpg',
            rating: 4.5
        }
    },
    {
        id: 5,
        name: 'Sony A7s II',
        image: '/images/product1.jpg',
        type: 'course',
        author: 'Jane Doe',
        gearup_service_fee: 10,
        vat: 5,
        lender: {
            name: 'Jane Doe',
            image: '/images/seller.jpg',
            rating: 4.8
        }
    },
    {
        id: 6,
        name: 'Sony A7s II',
        image: '/images/product1.jpg',
        type: 'course',
        author: 'Jane Doe',
        gearup_service_fee: 10,
        vat: 5,
        lender: {
            name: 'Jane Doe',
            image: '/images/seller.jpg',
            rating: 4.8
        }
    },

]

const CartItems = () => {
    const [newCartItems, setNewCartItems] = React.useState(cartItems)

    const handleDeleteItem = (id: number) => {
        setNewCartItems(newCartItems.filter((item) => item.id !== id))
    }

    return (
        <div className={styles.container}>
            {newCartItems.map((item) => {
                if (item.type === 'rental') {
                    return (
                        <CartItemCardContainer key={item.id} name={item.name} handleDeleteItem={handleDeleteItem} type={item.type} id={item.id}>
                            <RentalComp item={item} />
                        </CartItemCardContainer>
                    )
                }
                if (item.type === 'Gear sale') {
                    return (
                        <CartItemCardContainer key={item.id} name={item.name} handleDeleteItem={handleDeleteItem} type={item.type} id={item.id}>
                            <GearSaleComp item={item} />
                        </CartItemCardContainer>
                    )
                }
                if (item.type === 'course') {
                    return (
                        <CartItemCardContainer key={item.id} name={item.name} handleDeleteItem={handleDeleteItem} type={item.type} id={item.id}>
                            <CourseComp item={item} />
                        </CartItemCardContainer>
                    )
                }
            })}
        </div>
    )
}

export default CartItems;


const RentalComp = ({ item }: any) => {
    return (
        <div>
            <div className={styles.summary_item}>
                <h4>Author</h4>
                <div className={styles.owner}>
                    <div className={styles.image} >
                        <CustomImage height={40} width={50} src={item?.lender?.image} alt="owner" />
                    </div>
                    <p>{item.lender.name}</p>
                    <Ratings rating={item?.lender?.rating} />
                </div>
            </div>
            <div className={styles.summary_item}>
                <h4>Type</h4>
                <p className={styles.type}>{item.type}</p>
            </div>
            <div className={styles.summary_item}>
                <h4>Gearup service fee</h4>
                <p>$400.0</p>
            </div>
            <div className={styles.summary_item}>
                <h4>VAT</h4>
                <p>10 days</p>
            </div>
            <div className={`${styles.summary_item} ${styles.total_amount}`}>
                <h4>Total</h4>
                <p>$400.0</p>
            </div>
        </div>
    )
}

const GearSaleComp = ({ item }: any) => {
    return (
        <div>
            <div className={styles.summary_item}>
                <h4>Author</h4>
                <div className={styles.owner}>
                    <div className={styles.image} >
                        <CustomImage height={40} width={50} src={item?.seller?.image} alt="owner" />
                    </div>
                    <p>{item?.seller?.name}</p>
                    <Ratings rating={item?.seller?.rating} />
                </div>
            </div>
            <div className={styles.summary_item}>
                <h4>Type</h4>
                <p className={styles.type}>{item.type}</p>
            </div>
            <div className={styles.summary_item}>
                <h4>Gearup service fee</h4>
                <p>$400.0</p>
            </div>
            <div className={styles.summary_item}>
                <h4>VAT</h4>
                <p>10 days</p>
            </div>
            <div className={`${styles.summary_item} ${styles.total_amount}`}>
                <h4>Total</h4>
                <p>$400.0</p>
            </div>
        </div>
    )
}

const CourseComp = ({ item }: any) => {
    return (
        <div>
            <div className={styles.summary_item}>
                <h4>Author</h4>
                <div className={styles.owner}>
                    <div className={styles.image} >
                        <CustomImage height={40} width={50} src={item?.lender?.image} alt="owner" />
                    </div>
                    <p>{item.lender.name}</p>
                    <Ratings rating={item?.lender?.rating} />
                </div>
            </div>
            <div className={styles.summary_item}>
                <h4>Type</h4>
                <p className={styles.type}>{item.type}</p>
            </div>
            <div className={styles.summary_item}>
                <h4>Gearup service fee</h4>
                <p>$400.0</p>
            </div>
            <div className={styles.summary_item}>
                <h4>VAT</h4>
                <p>10 days</p>
            </div>
            <div className={`${styles.summary_item} ${styles.total_amount}`}>
                <h4>Total</h4>
                <p>$400.0</p>
            </div>
        </div>
    )
}