import React from 'react'
import styles from './RolesPermissionCardMob.module.scss'
import { CustomRadioButton } from '@/shared'

interface Props {
    item: any
}

const RolesPermissionCardMob = ({ item }: Props) => {
  
    return (
        <div>
            <div className={styles.container__details}>
                <div className={styles.container__details__detail_container}>
                    <p className={styles.key}>Permission</p>
                    <div>
                        <p className={styles.permission_title}>{item.title}</p>
                        <ul className={styles.permissions_container} style={{ fontSize: "1.2rem", color: "#4B525A" }}>
                            {item.permissions.map((permission: string) => (
                                <li style={{ fontSize: "1.2rem", color: "#4B525A", fontWeight: 400 }} key={permission}>{permission}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={styles.container__details__detail_container}>
                    <p className={styles.key}>Super Admin</p>
                    <div className={styles.super_admin}>
                        <ul>
                            {
                                item.permissions.map((item: string, index: number) => {
                                    return (
                                        <li key={index} className={styles.permission}>
                                            <CustomRadioButton
                                            />
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                </div>
                <div className={styles.container__details__detail_container}>
                    <p className={styles.key}>Admin</p>
                    <div className={styles.super_admin}>
                        <ul>
                            {
                                item.permissions.map((item: string, index: number) => {
                                    return (
                                        <li key={index} className={styles.permission}>
                                            <CustomRadioButton
                                            />
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                </div>
                <div className={styles.container__details__detail_container}>
                    <p className={styles.key}>Design</p>
                    <div className={styles.super_admin}>
                        <ul>
                            {
                                item.permissions.map((item: string, index: number) => {
                                    return (
                                        <li key={index} className={styles.permission}>
                                            <CustomRadioButton
                                            />
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RolesPermissionCardMob