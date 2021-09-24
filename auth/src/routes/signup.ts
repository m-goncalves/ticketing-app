import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationsError } from '../errors/request-validation-error';
import { DatabaseConnetionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('You must enter an valide e-mail!'), 
  body('password')
    .trim()
    .isLength({ min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    throw new RequestValidationsError(errors.array());
  }
  
  //console.log('Creating an user...!!!');
  throw new DatabaseConnetionError();

  res.send({});


});

export { router as signupRouter };