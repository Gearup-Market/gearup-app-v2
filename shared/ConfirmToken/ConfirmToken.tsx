// components/TokenConfirm.tsx
'use client'
import React, { useState, useRef } from 'react';
import styles from './ConfirmToken.module.scss';
import { HeaderSubText } from '@/components/Admin';

interface TokenConfirmProps {
    length: number;
    onComplete: (token: string) => void;
}

const ConfirmToken: React.FC<TokenConfirmProps> = ({ length, onComplete }) => {
    const [token, setToken] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

    const handleChange = (index: number, value: string) => {
        const newToken = [...token];
        newToken[index] = value;
        setToken(newToken);
        if (value.length === 1 && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
        if (value === '' && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
        if (newToken.every(char => char.length === 1)) {
            const completedToken = newToken.join('');
            onComplete(completedToken);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const charCode = e.charCode || e.keyCode;
        if (charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
        if (charCode === 8 && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div>
            <div className={styles.tokenContainer}>
                {token.map((value, index) => (
                    <input
                        key={index}
                        ref={el => {
                            inputRefs.current[index] = el;
                        }}
                        className={styles.token_input}
                        type="text"
                        value={value}
                        maxLength={1}
                        onChange={e => handleChange(index, e.target.value)}
                        onKeyPress={e => handleKeyPress(e, index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConfirmToken;
