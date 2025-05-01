import React from 'react'
import EmptyList from './components/EmptyList/EmptyList'

interface Props {
    category: string | null
}

const CategoryList = ({ category }: Props) => {
    return (
        <div>
            <EmptyList />
        </div>
    )
}

export default CategoryList