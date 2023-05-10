import express from 'express'
import authController from './controllers/authController'
import { ensureAuth } from './middlewares/auth'
import noteController from './controllers/noteController'

const router = express.Router()

// @ts-ignore
router.post('/register', authController.register)
// @ts-ignore
router.post('/login', authController.login)
// @ts-ignore
router.post('/notes', ensureAuth, noteController.create)
// @ts-ignore
router.get('/notes', ensureAuth, noteController.getAllNotes)
// @ts-ignore
router.get('/notes/:id', ensureAuth, noteController.getNote)
// @ts-ignore
router.put('/notes/:id', ensureAuth, noteController.updateNote)

export default router