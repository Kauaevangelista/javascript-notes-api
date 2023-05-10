import { Types } from 'mongoose';
import Note, { NoteAttributes } from '../models/Note'
import { UserAttributes } from '../models/User';

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

      getNote: async (id: string) => {
        const note = await Note.findById(id)
        return note
      },

      getAllNotes: async (author: UserAttributes) => {
        try {
          const notes = await Note.find({author})
          return notes
        } catch (error) {
          console.log(error)
        }
      }

    }

export default noteService