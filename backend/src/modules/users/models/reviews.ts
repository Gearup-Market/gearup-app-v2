import { model, Schema, Document } from 'mongoose';
import { Review } from '../types';

const reviewSchema: Schema = new Schema<Review>({
  reviewer: { type: Schema.Types.String, ref: 'User', required: true, index: true },
  reviewed: { type: Schema.Types.String, ref: 'User', required: true },
  transaction: { type: Schema.Types.String, ref: 'Transaction', index: true },
  rating: { type: Schema.Types.Number, required: true, min: 1, max: 5 },
  comment: { type: Schema.Types.String },
  createdAt: { type: Schema.Types.Date, default: Date.now() },
  updatedAt: { type: Schema.Types.Date, default: Date.now }
});

const reviewModel = model<Review & Document>('Review', reviewSchema, 'reviews');

export default reviewModel;
