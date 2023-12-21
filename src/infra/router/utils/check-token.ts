import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    try {
      jwt.verify(token, process.env.SECRET as string)
      // req.token = token;
      next();
    } catch(err) {
      res.statusCode = 403;
      res.send();
    }
    
  } else res.sendStatus(403);
}
