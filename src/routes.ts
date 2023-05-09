import express from 'express'
import authController from './controllers/authController'
import { ensureAuth } from './middlewares/auth'
import noteController from './controllers/noteController'

const router = express.Router()

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/notes', ensureAuth, noteController.create)

export default router