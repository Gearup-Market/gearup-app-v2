import { AxiosError } from "axios";


export interface iGetAnalyticsResp {
    "success": boolean,
    "data": {
      "activeListings": number,
      "ongoingTransactions": number,
      "completedDeals": number,
      "declinedDeals": number,
      "allTransactions": number,
      "recentTransactions": []
    }
  }

  export type IGetAnalyticsErr = AxiosError<{ status: string }>;