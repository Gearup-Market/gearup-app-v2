import { AxiosError } from "axios";

export interface IGetMessagesResp {
    success: boolean;
    data: MessageData[];
  }
  
  export interface MessageData {
    _id: string;
    participants: string[];
    listingItem: ListingItem;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface ListingItem {
    _id: string;
    productName: string;
    listingPhotos: string[];
    offer: Offer;
  }
  
  export interface Offer {
    forRent: RentOffer;
  }
  
  export interface RentOffer {
    currency: string;
    day1Offer: number;
    day3Offer: number;
    day7Offer: number;
    overtimePercentage: number;
    totalReplacementValue: number;
    _id: string;
  }
  
  export interface Message {
    _id: string;
    sender: string;
    message: string;
    status: string;
    timestamp: string;
    attachment: string[];
  }
  

  export type IGetMessagesErr = AxiosError<{ status: string }>;