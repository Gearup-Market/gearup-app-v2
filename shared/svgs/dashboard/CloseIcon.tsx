import React from 'react'

interface Props {
    color?: string;
}
const CloseIcon = ({ color="#4B525A" }: Props) => {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.75 5.75L5.25 19.25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.75 19.25L5.25 5.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default CloseIcon