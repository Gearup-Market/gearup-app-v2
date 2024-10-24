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
    const imageHandler = () => {

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files ? input.files[0] : null;
            if (file) {
                const formData = new FormData();
                formData.append('image', file);

                // Upload the image to your server or cloud service and get the URL
                const url = await uploadImageToServer(formData);

                // Ensure that the editor instance is available before inserting the image
                const quillEditor = (document.querySelector('.ql-editor') as any)?.__quill;
                if (quillEditor) {
                    const range = quillEditor.getSelection();
                    quillEditor.insertEmbed(range.index, 'image', url);
                }
            }
        };
    };

    const uploadImageToServer = async (formData: FormData): Promise<string> => {
        // Replace this with your image upload logic.
        // Here, I'm returning a placeholder URL for demonstration purposes.
        // Upload image to your server or use a cloud service like AWS S3, Firebase, or Cloudinary.
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('https://via.placeholder.com/150');
            }, 1000);
        });
    };

    

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],   
        ['blockquote', 'code-block'],
        ['image', 'video'],
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
                value={value || ''} // Ensure value is always a string
                onChange={setValue}
                placeholder={placeholder}
                modules={modules}
            />
        </div>
    );
}

export default CustomTextEditor;
