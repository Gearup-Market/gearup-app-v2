import React from 'react'

interface Props {
    color?: string
}

const WithdrawIcon = ({ color = "#292D32" }: Props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16663 14.5846L15.8333 2.91797" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.16663 6.02734V14.5857H12.725" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M2.91663 18.332H17.0833" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default WithdrawIcon