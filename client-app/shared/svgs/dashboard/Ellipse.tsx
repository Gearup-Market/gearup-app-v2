import React from 'react'
interface Props {
    color: string
}
const EllipseIcon = ({ color }: Props) => {
    return (
        <svg style={{ width: '1rem', height: '1rem' }} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill={color} />
        </svg>
    )
}

export default EllipseIcon