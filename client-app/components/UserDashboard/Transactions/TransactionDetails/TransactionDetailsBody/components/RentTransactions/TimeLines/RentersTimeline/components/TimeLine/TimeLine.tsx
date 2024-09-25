import React from 'react'
import { rentRentersTimeline } from '../../../../../utils/data'
import styles from './TimeLine.module.scss'
import { CheckmarkIcon } from '@/shared/svgs/dashboard'


interface Props {
    steps: number
}

const TimeLine = ({ steps }: Props) => {
    return (
        <ul className={styles.timelines_container}>
            {
                rentRentersTimeline?.map((timeline: any) => {
                    return (
                        <li key={timeline.id} className={styles.timeline}>
                            <div className={styles.span_container}>
                                <span className={styles.id_container} data-active={timeline.id <= steps}>
                                    {
                                        steps - 1 < timeline.id ? timeline.id : <span className={styles.check_icon} data-active={timeline.id <= steps}><CheckmarkIcon /></span>
                                    }
                                </span>
                                {
                                    timeline.id < 6 && <div data-active={timeline.id <= steps - 1} className={styles.line_icon}>
                                    </div>
                                }
                            </div>
                            <p data-active={timeline.id <= steps}>{timeline.name}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default TimeLine