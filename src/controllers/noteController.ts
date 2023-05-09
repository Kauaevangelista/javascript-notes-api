import { Request, Response } from 'express';
import { NoteAttributes } from '../models/Note';
import noteService from '../services/noteService';


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
    }
}

export default noteController