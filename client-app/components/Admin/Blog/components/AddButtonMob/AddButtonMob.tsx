import { GridAddIcon } from '@mui/x-data-grid'
import React from 'react'
import styles from './AddButtonMob.module.scss'

interface Props {
    onClick?: () => void
}

const AddButtonMob = ({ onClick }: Props) => {
    return (
        <div className={styles.container}>

            <GridAddIcon onClick={onClick} className={styles.add_icon} />

        </div>
    )
}

export default AddButtonMob