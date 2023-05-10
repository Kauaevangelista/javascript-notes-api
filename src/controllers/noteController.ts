import { Request, Response } from 'express';
import Note, { NoteAttributes } from '../models/Note';
import noteService from '../services/noteService';
import { UserAttributes } from '../models/User';


const noteController = {
    create: async (req: Request, res: Response): Promise<void> => {
        const noteData: NoteAttributes = req.body
        const author = req.user!._id;
        try {
            const existingNote = await noteService.findByTitle(noteData.title)
            if (existingNote) {
                res.status(400).json({ message: 'Title already in use :(' })
                return;
            }

            const newNote = await noteService.createNote(noteData, author).catch((err) => console.log(err))
            res.status(201).send(newNote);
        } catch (error) {
            res.status(500).json({ message: 'Problem to create a new note' });
        }
    },

    getNote: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const user = req.user
            const note: any = await noteService.getNote(id)
            if (isOwner(user, note)) {
                res.json(note)
            } else {
                res.status(403).json({error: 'Permission denied'})
            }
        } catch (error) {
            res.status(500).json({error: 'Problem to get a note'})
        }
    },

    getAllNotes: async (req: Request, res: Response) => {
        try {
            const user = req.user._id
            const notes = await noteService.getAllNotes(user)
            res.json(notes)    
        } catch (error) {
            res.json({error: error}).status(500)
        }
    }

}

const isOwner = (user: UserAttributes, note: NoteAttributes) => {
    if(JSON.stringify(user._id) == JSON.stringify(note.author._id)) return true;
    else return false;
  }

export default noteController