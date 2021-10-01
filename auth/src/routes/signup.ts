import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationsError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
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
  
    throw new BadRequestError('Email already in use!');
  }

  const user = User.build({ email, password });
  await user.save();

  //Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!
  );

  //Storing it on session object
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user);

});

export { router as signupRouter };