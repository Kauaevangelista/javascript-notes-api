import { Schema, model, Document, Types } from 'mongoose';
import { UserAttributes } from './User';

export interface NoteAttributes extends Document {
  title: string;
  body: string;
  created_at: Date
  updated_at: Date
  author: UserAttributes | Types.ObjectId
}


const noteSchema = new Schema<NoteAttributes>({
  title: { type: String, required: true },
  body: { type: String, required: true },    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
      }
  })

  const Note = model<NoteAttributes>('Note', noteSchema)

export default Note