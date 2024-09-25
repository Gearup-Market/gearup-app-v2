import { model, Schema, Document } from 'mongoose';
import { Category, Field } from '../types';

const valueSchema = new Schema<Field['values']>({
  id: { type: Schema.Types.String, required: true },
  name: { type: Schema.Types.String, required: true },
});

export const fieldSchema = new Schema<Field>({
  name: { type: Schema.Types.String, required: true },
  fieldType: { type: Schema.Types.String, required: true },
  values: [valueSchema]
});

const categorySchema: Schema = new Schema<Category>({
  name: { type: Schema.Types.String, required: true, index: true},
  parentId: { type: Schema.Types.String, index: true},
  image: { type: Schema.Types.String },
  fields: [fieldSchema],
  createdAt: { type: Schema.Types.Date, default: Date.now() },
  updatedAt: { type: Schema.Types.Date },
});

const categoryModel = model<Category & Document>('Category', categorySchema, 'category');

export default categoryModel;
