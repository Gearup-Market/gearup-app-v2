'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './FavoriteStar.module.scss'

interface FavoriteStarProps {
    isFavorite?: boolean;
    onToggle?: (isFavorite: boolean) => void;
}

const FavoriteStar: React.FC<FavoriteStarProps> = ({ isFavorite = false, onToggle }) => {
    const [favorite, setFavorite] = useState(isFavorite);

    const handleToggle = (e: any) => {
        e.stopPropagation();
        const newFavoriteState = !favorite;
        setFavorite(newFavoriteState);
        if (onToggle) {
            onToggle(newFavoriteState);
        }
    };

    return (
        <button onClick={handleToggle} aria-label="Toggle favorite" className={styles.button}>
            <Image src={favorite ? "/svgs/colored-star.svg" : "/svgs/naked-star.svg"} alt='fave-icon' height={24} width={24} />
        </button>
    );
};

export default FavoriteStar;
