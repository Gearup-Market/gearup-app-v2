'use client';
import React, { use, useState } from 'react'
import styles from './TransactionFilters.module.scss'
import { set } from 'lodash';
import ReuseableFilters from '@/components/Admin/ReuseableFilter/ReuseableFilter';

const TransactionFilters = () => {
    const [activeFilterId, setActiveFilterId] = useState(1)
    const [activeSubFilterId, setActiveSubFilterId] = useState(1)
    const parentFilters = [
        {
            id: 1,
            name: 'Rent',
            subFilters: [
                {
                    id: 1,
                    name: 'Requested'
                },
                {
                    id: 2,
                    name: 'Accepted/Ongoing'
                },
                {
                    id: 3,
                    name: 'Completed'
                },
                {
                    id: 4,
                    name: 'Canceled/declined'
                }
            ]
        },
        {
            id: 2,
            name: 'Buy',
            subFilters: [
                {
                    id: 1,
                    name: 'Requested'
                },
                {
                    id: 2,
                    name: 'Accepted/Ongoing'
                },
                {
                    id: 3,
                    name: 'Completed'
                },
                {
                    id: 4,
                    name: 'Canceled/declined'
                }
            ]
        },
        {
            id: 3,
            name: 'Courses',
            subFilters: [
                {
                    id: 1,
                    name: 'Ebooks'
                },
                {
                    id: 2,
                    name: 'Live'
                },
                {
                    id: 3,
                    name: 'Video'
                },
                {
                    id: 4,
                    name: 'Audio'
                }
            ]
        }
    ]
    return (
        <ReuseableFilters parentFilters={parentFilters} activeFilterId={activeFilterId} setActiveFilterId={setActiveFilterId} setActiveSubFilterId={setActiveSubFilterId} activeSubFilterId={activeSubFilterId} />
    )
}

export default TransactionFilters