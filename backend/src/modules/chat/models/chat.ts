/* eslint-disable prettier/prettier */
// models/chat.ts
import { Schema, model, Document } from 'mongoose';
import { ChatMessage, MessageStatus } from '../types';

// Define an enum for message status

interface Chat extends Document {
    participants: string[];
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}

const chatMessageSchema = new Schema<ChatMessage>({
    _id: { type: Schema.Types.ObjectId, auto: true },  // Explicitly declare _id for clarity

    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: Schema.Types.String, required: true },
    status: { type: String, enum: Object.values(MessageStatus), default: MessageStatus.Sent },
    attachment: [{
        url: { type: Schema.Types.String, required: true },
        type: { type: Schema.Types.String, required: true }
    }],
    timestamp: { type: Schema.Types.Date, default: Date.now },
});

const chatSchema = new Schema<Chat>({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [chatMessageSchema],
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
});

const chatModel = model<Chat & Document>('Chat', chatSchema, 'chats');
chatSchema.virtual('messageCount').get(function () {
    return this.messages.length;
});
export default chatModel;
