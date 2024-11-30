import { KycDetails } from '@/components/Admin'
import React from 'react'

const UserDetailsView = ({ slug }: { slug: string }) => {
    return (
        <div>
            <KycDetails slug={slug} />
        </div>
    )
}

export default UserDetailsView