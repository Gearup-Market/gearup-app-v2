import { KycDetailsView } from '@/views/AdminViews'
import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
    return (
        <div>
            <KycDetailsView slug={params.slug} />
        </div>
    )
}

export default Page