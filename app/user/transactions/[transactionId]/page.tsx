import { TransactionDetailsView } from '@/views/UserDashboardViews'
import React from 'react'

const Page = ({ params }: { params: { transactionId: string } }) => {
  return (
    <div>
      <TransactionDetailsView transactionId={params.transactionId} />
    </div>
  )
}

export default Page