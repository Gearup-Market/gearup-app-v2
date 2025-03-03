import React from 'react'
import styles from './PersonalDetails.module.scss'
import { LocationEllipse, VerifyIcon } from '@/shared/svgs/dashboard'
import { Button } from '@/shared'
import Link from 'next/link';

interface Props {
    name?: string;
    subText?: string;
    profileLink: string;
    title?: string;
    isVerified?: boolean;
}

const PersonalDetails = ({ name, subText, profileLink, title, isVerified = false }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.container__customer_container}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.location_details}>
                    <span className={styles.location_icon}>
                        <LocationEllipse />
                    </span>
                    <div>
                        <h4>
                            {name}
                        </h4>
                        <p>{subText}</p>
                    </div>
                    {
                        isVerified &&
                        <span className={styles.verfiy_icon}>
                            <VerifyIcon />
                        </span>
                    }
                </div>
                <div className={styles.btn_container}>
                    <Button buttonType='secondary' className={styles.btn}>
                        <Link href={profileLink} target="_blank">
                            View Profile
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails