import { TransactionDetailsView } from '@/views/AdminViews'
import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <TransactionDetailsView slug={params.slug} />
    </div>
  )
}

export default Page