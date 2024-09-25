// components/StarRating.tsx
'use client';
import { useState } from 'react';
import styles from './StarRating.module.scss';

interface StarRatingProps {
    totalStars?: number;
    onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onRatingChange }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (ratingValue: number) => {
        setRating(ratingValue);
        if (onRatingChange) {
            onRatingChange(ratingValue);
        }
    };

    return (
        <div className={styles.starRating}>
            {[...Array(totalStars)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span
                        key={index}
                        className={
                            ratingValue <= (hover || rating) ? styles.filledStar : styles.emptyStar
                        }
                        onClick={() => handleClick(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
