import { AxiosError } from "axios";

export interface iPostCreateReviewReq {
    transaction: string;
    reviewer: string;
    reviewed: string;
    rating: number;
    comment: string;
  }

  export interface iPostCreateReviewResp {
    reviewer: string;
    reviewed: string;
    rating: number;
    comment: string;
    transaction: string;
    isBuyer: boolean;
  }


  export type IRequestErr = AxiosError<{ status: string }>;