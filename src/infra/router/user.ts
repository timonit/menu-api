import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';


const userRouter = Router();

userRouter.post('/login', (req: Request, res: Response, next) => {
  const { login, password } = req.body;
  const user = {
    login: process.env.USER_LOGIN,
    password: process.env.USER_PASSWORD
  }

  if(login === user.login && password === user.password) {
    jwt.sign(
      {login: user.login},
      process.env.SECRET as string, 
      { expiresIn: '5h' },
      (err, token) => {
        if(err) console.log(err);
        res.send(token);
      }
    );
  } else {
    res.statusCode = 404;
    res.send('User not found');
  }
});




export { userRouter };
