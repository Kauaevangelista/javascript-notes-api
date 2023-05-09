import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    title: String,
    body: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
  }, { timestamps: true })

  const Note = mongoose.model('Note', noteSchema)

export { noteSchema, Note }