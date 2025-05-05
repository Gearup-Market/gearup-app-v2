import React from 'react'
import styles from './Skills.module.scss'

const Skills = () => {
    return (
        <div className={styles.container}>
            {
                Array.from({ length: 10 }, (_, index) => (
                    <p className={styles.skill} key={index}>
                        Video editing {index + 1}
                    </p>
                ))
            }
        </div>
    )
}

export default Skills