'use client'
import React from 'react'
import styles from './MembersCardMob.module.scss'
import Image from 'next/image'
import { MobileCard } from '@/shared'
import { MoreIcon } from '@/shared/svgs/dashboard'
import { ActionsPopover, RolesPopover } from '../MembersTable/Popovers'

interface Props {
    item: any
    lastEle?: boolean
    ind?: number
}

enum PopoverEnum {
    actions = "actions",
    roles = "roles"
}

const MembersCardMob = ({ item, lastEle, ind }: Props) => {
    const [showPopover, setShowPopover] = React.useState({
        actions: false,
        roles: false
    });

    const handleModalClick = (type: PopoverEnum) => {
        setShowPopover({
            actions: type === PopoverEnum.actions ? !showPopover.actions : false,
            roles: type === PopoverEnum.roles ? !showPopover.roles : false,
            [type]: !showPopover[type],
        })
    }

    return (
        <div className={styles.container}>
            <MobileCard mainHeaderText={item.name} subHeaderText={item.email} mainHeaderImage="/images/admin-img.jpg" lastEle={lastEle} ind={ind} >
                <div className={styles.container__details}>
                    <p className={styles.key}>Role</p>
                    <div className={styles.role_container} onClick={() => handleModalClick(PopoverEnum.roles)} >
                        <p className={styles.role}>
                            Customer service
                            <Image src='/svgs/filled-chevron.svg' height={10} width={10} alt='arrow' className={styles.icon} />
                        </p>
                        {
                            showPopover.roles && <div className={`${styles.more_modal}`}>
                                <RolesPopover />
                            </div>
                        }

                    </div>
                </div>
                <div className={styles.container__details}>
                    <p className={styles.key}>Action</p>
                    <div className={styles.actions_container}>
                        <MoreIcon onClick={() => handleModalClick(PopoverEnum.actions)} />
                        {
                            showPopover.actions && <div className={`${styles.more_modal}`}>
                                <ActionsPopover />
                            </div>
                        }
                    </div>
                </div>
            </MobileCard>
        </div>
    )
}

export default MembersCardMob