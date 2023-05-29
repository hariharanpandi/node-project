import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import AppConstants from '../utils/constant';
require('dotenv').config();

const appConstant = new AppConstants();

export default class AuthGuard {
  async validateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader: string | undefined = req.headers.authorization;
      if (!authHeader) {
        res.status(400).send(appConstant.MESSAGES.EMPTY_TOKEN);
        return;
      }
      if (authHeader && authHeader.startsWith(appConstant.TOKEN.PERFIX_TOKEN)) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY as string, (error: Error | null, decoded: any) => {
          if (error) {
            res.status(401).send(appConstant.MESSAGES.UNAUTHORIZED_USER);
            return;
          }
          next();
        });
      } else {
        res.status(400).send(appConstant.MESSAGES.INVALID_TOKEN);
      }
    } catch (error: any) {
      res.status(400).send(appConstant.MESSAGES.INVALID_TOKEN);
    }
  }

}