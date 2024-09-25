import React from 'react'
import styles from './About.module.scss'

const About = () => {
    return (
        <div className={styles.container}>
            <h2>About</h2>
            <p >The Hollyland Solidcom C1-6S Intercoms 6x is a cutting-edge communication solution designed for seamless and crystal-clear communication in professional settings. With a compact and robust design, this intercom system provides reliable, wireless communication for up to six ... <span className={styles.read_more}>Read more</span></p>
        </div>
    )
}

export default About