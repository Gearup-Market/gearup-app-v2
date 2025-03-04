import React from 'react'
import { Transactions } from '../../components/Admin'

interface Props {
  showTitle?: boolean
}

const TransactionsView = ({ showTitle }: Props) => {
  return (
    <Transactions showTitle={showTitle} />
  )
}

export default TransactionsView