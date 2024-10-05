import { AxiosError } from "axios";


export interface iGetAnalyticsResp {
    success: boolean,
    data: {
      activeListings: number,
      ongoingTransactions: number,
      completedDeals: number,
      declinedDeals: number,
      allTransactions: number,
      recentTransactions: []
    }
  }

  export type IGetAnalyticsErr = AxiosError<{ status: string }>;

  export interface iGetSalesAnalyticsResp{
    success: true,
    data: SalesAnalyticsData
  }

  export interface SalesAnalyticsData{
    totalEarnings: number,
    breakdown: GearData
  }


	export interface GearData {
		gearRentals: {
			amount: number;
			percentage: string;
		};
		gearSales: {
			amount: number;
			percentage: string;
		};
	}