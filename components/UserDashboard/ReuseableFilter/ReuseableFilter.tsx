'use client';
import { Filter } from '@/interfaces/Listing';
import styles from './ReuseableFilter.module.scss'
import { removeTrailingCommad } from '@/utils';

interface Props {
    parentFilters: Filter[]
    activeFilterId: number | string
    setActiveFilterId: any
    setActiveSubFilterId: any
    activeSubFilterId: number | string
    showChildrenFilters?: boolean

}
const ReuseableFilters = ({ parentFilters, activeFilterId, setActiveFilterId, setActiveSubFilterId, activeSubFilterId, showChildrenFilters= true }: Props) => {

    return (
        <div className={styles.container}>
            <div className={styles.container__filters}>
                <ul className={styles.container__filters__parent_container}>
                    {
                        parentFilters.map((filter) => (
                            <li data-active={filter.id === activeFilterId} onClick={() => {
                                setActiveFilterId(filter.id)
                                setActiveSubFilterId(1)
                            }} key={`${filter.name}-${filter.id}`} className={styles.container__filters__parent_container__filter}>
                                <p>{filter.name}</p>
                            </li>
                        ))
                    }
                </ul>
                {
                    showChildrenFilters &&
                <ul className={styles.container__filters__children_container}>
                    {
                        parentFilters.find((filter) => filter.id === activeFilterId)?.subFilters.map((subFilter) => (
                            <li onClick={() => setActiveSubFilterId(subFilter.id)} key={`${subFilter.name}-${subFilter.id}`} className={styles.container__filters__children_container__filter} data-active={activeSubFilterId === subFilter.id}>
                                <p>{removeTrailingCommad(subFilter.name.split(' ')[0])}</p>
                            </li>
                        ))
                    }
                </ul>
                    }
            </div>
        </div>
    )
}

export default ReuseableFilters