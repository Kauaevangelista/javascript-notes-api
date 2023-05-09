import express from 'express'
import authController from './controllers/authController'

const router = express.Router()

router.post('/register', authController.register)

// router.post('/auth/login', authController.login)

export default router