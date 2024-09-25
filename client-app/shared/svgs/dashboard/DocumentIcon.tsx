import React from 'react'

interface Props {
    color?: string
}

const DocumentIcon = ({color}:Props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 5.83329V14.1666C17.5 16.6666 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6666 2.5 14.1666V5.83329C2.5 3.33329 3.75 1.66663 6.66667 1.66663H13.3333C16.25 1.66663 17.5 3.33329 17.5 5.83329Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.084 3.75V5.41667C12.084 6.33333 12.834 7.08333 13.7507 7.08333H15.4173" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.66602 10.8334H9.99935" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.66602 14.1666H13.3327" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default DocumentIcon