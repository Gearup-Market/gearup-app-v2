import React from 'react'
import styles from './SearchField.module.scss'
import Image from 'next/image'
import Button from '../button/Button'

const SearchField = () => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.input}`}>
                <div className={styles.input_wrapper}>
                    <figure className={styles.input_icon}>
                        <Image
                            src="/svgs/icon-search-normal.svg"
                            fill
                            sizes="100vw"
                            alt=""
                        />
                    </figure>
                    <input
                        className={styles.input_field}
                        type="text"
                        autoComplete="off"
                        placeholder="Search by job role"
                    />
                </div>
            </div>
            <Button
                className={styles.button}

            >
                Search
            </Button>
        </div>
    )
}

export default SearchField