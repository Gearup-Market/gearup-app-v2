import { model, Schema, Document } from 'mongoose';
import { Session } from '../types';

const sessionSchema: Schema = new Schema<Session>({
  userId: { type: Schema.Types.String, required: true },
  sessionId: { type: Schema.Types.String, required: true },
  sessionCount: { type: Schema.Types.Number, default: 1 },
  lastActivity: { type: Schema.Types.Date },
  createdAt: { type: Schema.Types.Date, default: Date.now() },
  updatedAt: { type: Schema.Types.Date },
});

sessionSchema.index({ sessionId: 1, userId: 1, lastActivity: 1 });
const sessionModel = model<Session & Document>('Session', sessionSchema, 'sessions');

export default sessionModel;
