import React, { useState } from 'react'
import styles from './CourseContent.module.scss'
import { HeaderSubText } from '@/components/UserDashboard'
import { CustomTextEditor } from '@/shared'

const CourseContent = () => {
    const [tableOfContent, setTableOfContent] = useState<string>('')
    const [whatToLearn, setWhatToLearn] = useState<string>('')
    return (
        <div className={styles.container}>
            <HeaderSubText title="Content" description='Start putting together your course by creating table of contents and what to learn' />
            <div className={styles.field}>
                <CustomTextEditor value={tableOfContent} setValue={setTableOfContent} label='Table of contents' placeholder='Enter your course table of contents here...' />
            </div>
            <div className={styles.field}>
                <CustomTextEditor value={whatToLearn} setValue={setWhatToLearn} label='You’ll learn' placeholder='Describe in detail what to expect from your course...' />
            </div>
        </div>
    )
}

export default CourseContent