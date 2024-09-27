import { UserDetails } from '@/components/Admin'
import React from 'react'

const UserDetailsView = ({ slug }: { slug: string }) => {
    return (
        <div>
            <UserDetails slug={slug} />
        </div>
    )
}

export default UserDetailsView