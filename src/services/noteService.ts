import { Types } from 'mongoose';
import Note, { NoteAttributes } from '../models/Note'

const noteService = {
    createNote: async (data: NoteAttributes, author: Types.ObjectId): Promise<NoteAttributes> => {
        const note = new Note({...data, author})
        await note.save()
        return note;
      },

      findByTitle: async (title: string): Promise<NoteAttributes | null> => {
        const note = await Note.findOne({ title });
        return note;
      },
    }

export default noteService