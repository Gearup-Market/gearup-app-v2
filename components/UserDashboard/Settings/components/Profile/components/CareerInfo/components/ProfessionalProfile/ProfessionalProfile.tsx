import React from 'react'
import styles from './ProfessionalProfile.module.scss'
import { Select, TextArea, Button } from '@/shared'

const ProfessionalProfile = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <Select options={jobTitles} label="Job title" />
                <TextArea placeholder="Type here..." label={
                    <span>
                        Add skills <span className={styles.sub_label}> (You can add more than one skills)</span>
                    </span>
                } />
                <Button>Save changes</Button>
            </form>

        </div>
    )
}

export default ProfessionalProfile

const jobTitles = [
    "Cinematographer",
    "Video Editor",
    "Photographer",
    "Colorist",
    "Producer",
    "Lighting Technician",
    "Camera Operator",
    "Audio Technicians",
    "Visual Effects Artists",
    "Lighting Designers",
    "Set Designers",
    "Production Assistants",
    "Sound Designers",
    "Costume Designers",
    "Makeup Artists",
    "Prop Masters",
    "Gaffers",
    "Key Grip",
    "Script Supervisors",
    "Directors",
    "Production Designers",
    "Stunt Coordinators"
];
