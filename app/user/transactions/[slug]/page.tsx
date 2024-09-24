import { TransactionDetailsView } from '@/views/UserDashboardViews'
import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
  return (
      <TransactionDetailsView slug={params.slug} />
  )
}

export default Page