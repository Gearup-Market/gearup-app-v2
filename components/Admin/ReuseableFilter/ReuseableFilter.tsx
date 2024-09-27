'use client';
import styles from './ReuseableFilter.module.scss'

interface Props {
    parentFilters: { id: number, name: string, subFilters: { id: number, name: string }[] }[]
    activeFilterId: number
    setActiveFilterId: (id: number) => void
    setActiveSubFilterId: (id: number) => void
    activeSubFilterId: number

}
const ReuseableFilters = ({ parentFilters, activeFilterId, setActiveFilterId, setActiveSubFilterId, activeSubFilterId }: Props) => {

    return (
        <div className={styles.container}>
            <div className={styles.container__filters}>
                <ul className={styles.container__filters__parent_container}>
                    {
                        parentFilters.map((filter) => (
                            <li data-active={filter.id === activeFilterId} onClick={() => {
                                setActiveFilterId(filter.id)
                                setActiveSubFilterId(1)
                            }} key={filter.id} className={styles.container__filters__parent_container__filter}>
                                <p>{filter.name}</p>
                            </li>
                        ))
                    }
                </ul>
                <ul className={styles.container__filters__children_container}>
                    {
                        parentFilters.find((filter) => filter.id === activeFilterId)?.subFilters.map((subFilter) => (
                            <li onClick={() => setActiveSubFilterId(subFilter.id)} key={subFilter.id} className={styles.container__filters__children_container__filter} data-active={activeSubFilterId === subFilter.id}>
                                <p>{subFilter.name}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ReuseableFilters