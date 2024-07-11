// middlewares/authenticate.ts

import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';

export interface RequestWithUser extends Request<ParamsDictionary, any, any> {
  user?: any;
}

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

const authenticate = ((req:RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if(secretKey !== undefined)
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
});


export default authenticate;