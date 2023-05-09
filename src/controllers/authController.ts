import { Request, Response } from 'express';
import userService from '../services/userService';
import { UserAttributes } from '../models/user'

const authController = {
    register: async (req: Request, res: Response): Promise<void> => {
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
    }
  }

export default authController