import { RentingOffer, SellingOffer } from "@/interfaces/Listing";
import { AxiosError } from "axios";
import { iPostListingResp } from "../listings/types";
import { IUser, IUserResp, UserUpdateResp } from "../users/types";

export interface IGetMessagesResp {
    success: boolean;
    data: MessageData[];
  }
  
  export interface MessageData {
    _id: string;
    participants: UserUpdateResp[];
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

  export interface IGetConversationResp {
    success: boolean;
    data: {
      _id: string;
      participants: string[];
      listingItem: iPostListingResp;
      messages: {
        _id: string;
        sender: {
          _id: string;
          userId: string;
          email: string;
          password: string;
          userName: string;
          isVerified: boolean;
          createdAt: string;
          __v: number;
          id: string;
        };
        message: string;
        status: string;
        timestamp: string;
        attachment: any[];
        id: string;
      }[];
      createdAt: string;
      updatedAt: string;
      __v: number;
      id: string;
      messageCount: number;
    };
  }
  

  export interface ICreateChatMessageResp {
    success: boolean,
    data: {
      participants: string[],
      messages: [],
      _id: string,
      createdAt: string,
      updatedAt: string,
      "__v": 0
    }
  }


  export interface IChatMessageReq {
    senderId: string;
    message: string;
    chatId: string
    attachments: Attachment[];
  }
  
  interface Attachment {
    url: string;
    type: 'image' | 'document' | 'video' | 'audio'; // You can add more types as needed
  }
  