'use client';

import dynamic from 'next/dynamic';
import React, { InputHTMLAttributes, useState, useEffect } from 'react';
import styles from './TextEditor.module.scss';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface CustomTextEditorProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    setValue: (value: string) => void;
    label?: string;
    name?: string;
    placeholder?: string;
}

const CustomTextEditor = ({ value = '', setValue, placeholder, label, name }: CustomTextEditorProps) => {
    const [ssr, setSsr] = useState(true);

    useEffect(() => {
        setSsr(false);
    }, []);
    if (ssr) return null;

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['image'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
    ];

    const modules = {
        toolbar: toolbarOptions
    }

    return (
        <div className={styles.container}>
            {!!label && (
                <label className={styles.input_label} htmlFor={name}>
                    {label}
                </label>
            )}
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={setValue}
                placeholder={placeholder}
                modules={modules}
            />
        </div>
    );
}

export default CustomTextEditor;
