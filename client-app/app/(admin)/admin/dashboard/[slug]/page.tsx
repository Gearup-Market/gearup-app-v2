import { UserDetailsView } from '@/views/AdminViews'
import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
    return (
        <div>
            <UserDetailsView slug={params.slug} />
        </div>
    )
}

export default Page