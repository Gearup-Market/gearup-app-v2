import React from 'react'
import { HeaderSubText, Listings } from '../../../components/Admin'

interface Props {
    showTitle?: boolean
}

const ListingsView = ({ showTitle = false }: Props) => {
    return (
        <Listings showTitle={showTitle} />
    )
}

export default ListingsView