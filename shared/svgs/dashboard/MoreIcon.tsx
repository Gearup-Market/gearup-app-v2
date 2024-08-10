import React from 'react'

interface Props {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const MoreIcon = ({ onClick }: Props) => {
    return (
        <span onClick={onClick} style={{ width: '2rem', height: '2rem', cursor: 'pointer', zIndex: 0 }}>
            <svg id='options_icon' viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.75 10C4.65 10 3.75 10.9 3.75 12C3.75 13.1 4.65 14 5.75 14C6.85 14 7.75 13.1 7.75 12C7.75 10.9 6.85 10 5.75 10Z" stroke="#4B525A" strokeWidth="1.5" />
                <path d="M19.75 10C18.65 10 17.75 10.9 17.75 12C17.75 13.1 18.65 14 19.75 14C20.85 14 21.75 13.1 21.75 12C21.75 10.9 20.85 10 19.75 10Z" stroke="#4B525A" strokeWidth="1.5" />
                <path d="M12.75 10C11.65 10 10.75 10.9 10.75 12C10.75 13.1 11.65 14 12.75 14C13.85 14 14.75 13.1 14.75 12C14.75 10.9 13.85 10 12.75 10Z" stroke="#4B525A" strokeWidth="1.5" />
            </svg>
        </span>
    )
}

export default MoreIcon