import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationsError } from '../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('You must enter an valide e-mail!'), 
  body('password')
    .trim()
    .isLength({ min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    throw new RequestValidationsError(errors.array());
  }
  
  const { email, password } = req.body;

  const existingUser = await User.findOne({email});

  if (existingUser) {
    console.log('Email already in use');
    return res.send({});
  }

  const user = User.build({ email, password });
  await user.save();

  res.status(201).send(user);

});

export { router as signupRouter };