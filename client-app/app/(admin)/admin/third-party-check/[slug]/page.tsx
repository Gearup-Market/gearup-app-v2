import { ThirdPartyCheckDetailsView } from '@/views/AdminViews'
import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <ThirdPartyCheckDetailsView slug={params.slug} />
    </div>
  )
}

export default Page