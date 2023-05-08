import express, { Request, Response } from 'express'
import User from '../models/user'

const router = express.Router()

/* GET users listing. */
router.get('/', async (req: Request, res: Response, next) => {
    res.send('respond with a resource');
  });

  router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
  
    try {
      await user.save()
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({error: "Error registering new user please try again."});
    }
  });

export default router
