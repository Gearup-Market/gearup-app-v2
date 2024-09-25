'use client';
// components/CustomImage.tsx
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import styles from './CustomImage.module.scss';

interface CustomImageProps extends ImageProps {
    alt: string;
    src: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ alt, src, ...props }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className={styles.image_wrapper}>
            {loading && <div className={styles.shimmer}></div>}
            <Image
                alt={alt}
                src={src}
                onLoadingComplete={() => setLoading(false)}
                {...props}
                className={loading ? styles.shimmer : styles.image_loaded}
            />
        </div>
    );
};

export default CustomImage;
