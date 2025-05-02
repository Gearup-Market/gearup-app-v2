import React from 'react'
import EmptyList from './components/EmptyList/EmptyList'
import FreelancerCard from './components/FreelancerCard/FreelancerCard'
import styles from './CategoryList.module.scss'
interface Props {
    category: string | null
}

const CategoryList = ({ category }: Props) => {
    const list = []
    return (
        <div className={styles.container}>
            {
                list.length >= 0 ?
                    <div className={styles.card_list}>
                        {
                            Array.from({ length: 10 }, (_, index) => (
                                <FreelancerCard key={index} />
                            ))
                        }
                    </div>
                    :
                    <EmptyList />
            }
        </div>
    )
}

export default CategoryList