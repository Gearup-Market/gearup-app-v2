/* eslint-disable prettier/prettier */
import { Schema, model, Document } from 'mongoose';
import { User } from '@/modules/users/types';
export enum MessageStatus {
    Sent = 'sent',
    Delivered = 'delivered',
    Seen = 'seen'
}

export interface ChatMessage {
    _id: Schema.Types.ObjectId
    sender: Schema.Types.ObjectId;
    message: string;
    status: MessageStatus;
    attachment: {
        url: string;
        type: string;
    }[];
    timestamp: Date;
}

export interface Chat extends Document {
    participants: User;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}