import { Request, Response } from 'express';
import userService from '../services/userService';
import { UserAttributes } from '../models/User'
import jwtService from '../services/jwtService';

const authController = {
    register: async (req: Request, res: Response) => {
        const userData: UserAttributes = req.body;
        try {
          const existingUser = await userService.findByEmail(userData.email);
          if (existingUser) {
            res.status(400).json({ message: 'Email already in use :(' })
            return;
          }
          const newUser = await userService.createUser(userData);
          res.status(201).send(newUser);
        } catch (err) {
          res.status(500).json({ message: 'Something went wrong' });
        }
    },

    login: async (req: Request, res: Response) => {
      const { email, password } = req.body
  
      try {
        const user = await userService.findByEmail(email)
  
        if (!user) {
          return res.status(404).json({ message: 'E-mail não registrado' })
        }
  
        user.comparePassword(password, (err, isSame) => {
          if (err) {
            return res.status(400).json({ message: err.message })
          }
  
          if (!isSame) {
            return res.status(401).json({ message: 'Senha incorreta' })
          }
  
          const payload = {
            id: user.id,
            firstName: user.name,
            email: user.email
          }
  
          const token = jwtService.signToken(payload, '7d')
  
          return res.json({ authenticated: true, ...payload, token })
        })
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message })
        }
      }
    }

  }

export default authController