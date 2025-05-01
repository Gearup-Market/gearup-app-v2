import React from 'react'
import styles from './DoubleSearchField.module.scss'
import Image from 'next/image'
import { Button } from '@/shared'


const DoubleSearchField = () => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.input}`}>
                <div className={styles.input_wrapper}>
                    <figure className={styles.input_icon}>
                        <Image
                            src="/svgs/icon-location.svg"
                            fill
                            sizes="100vw"
                            alt=""
                        />
                    </figure>
                    <input
                        className={styles.input_field}
                        type="text"
                        autoComplete="off"
                        placeholder="Search by location"
                    />
                </div>
            </div>
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
                        placeholder="Search by username"
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

export default DoubleSearchField