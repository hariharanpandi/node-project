/* Process of the Middleware is 
    1) Extract the token from req header
    2) Check the middle ware is valid or Not
    3) If middelware is Valid to call the next middleware in the request processing pipe-line 
 */
// Import some packages
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import AppConstants from "../utils/appconstants";
require("dotenv").config();

const appConstant = new AppConstants();
class AuthGuard {
  async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      // First verify the Request Header have a Token or Not
      const authHeader: string | any =
        req.headers.Authorization || req.headers.authorization;
      if (!authHeader)
        return res.status(400).send(appConstant.MESSAGES.EMPTY_TOKEN);
      if (authHeader && authHeader.startsWith(appConstant.TOKEN.PERFIX_TOKEN)) {
        const token = authHeader.split(appConstant.TOKEN.SPLIT)[1];
        const validToken = jwt.verify(
          token,
          `${process.env.ACCESS_TOKEN_SECRET}`,
          (error: any, decoded: any) => {
            if (error) {
              return res
                .status(401)
                .send(appConstant.MESSAGES.UNAUTHORIZED_USER);
            }
            next();
          }
        );
      }
    } catch (error: any) {
      res.status(400).send(appConstant.MESSAGES.INVALID_TOKEN);
    }
  }
}

module.exports.authGuard = new AuthGuard();
