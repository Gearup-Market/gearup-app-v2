'use client'

import React, { useRef, useState } from 'react'
import styles from './FileUploader.module.scss'

type FileUploadProps = {
    onFileSelect: (file: File) => void
    label?: string
    text?: string
    accept?: string
}

const FileUploader: React.FC<FileUploadProps> = ({
    onFileSelect,
    label,
    text,
    accept = 'image/*,video/*',
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isVideo, setIsVideo] = useState(false)

    const handleFile = (file: File) => {
        onFileSelect(file)
        setIsVideo(file.type.startsWith('video'))
        const reader = new FileReader()
        reader.onloadend = () => setPreviewUrl(reader.result as string)
        reader.readAsDataURL(file)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
    }

    const triggerFileInput = () => fileInputRef.current?.click()

    return (
        <div className={styles.container}>
            {!!label && <label className={styles.label}>{label}</label>}

            <div
                className={styles.uploadBox}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={triggerFileInput}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    hidden
                    accept={accept}
                />
                {previewUrl ? (
                    isVideo ? (
                        <video
                            src={previewUrl}
                            controls
                            className={`${styles.preview} ${styles.video_preview}`}
                        />
                    ) : (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className={styles.preview}
                        />
                    )
                ) : (
                    <div className={styles.placeholder}>
                        <div className={styles.icon}>⬆️</div>
                        <p>
                            Drop your images here, or{' '}
                            <span className={styles.link}>click to upload</span>
                        </p>
                        {
                            !!text &&
                            <p className={styles.file_upload_text}>{text}</p>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default FileUploader
