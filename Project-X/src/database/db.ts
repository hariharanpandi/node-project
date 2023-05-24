import dotenv from "dotenv";
import mongoose from "mongoose";

import AppConstants from "../utils/appconstants";

const appConstant = new AppConstants();
dotenv.config();
export default class Database {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(`${process.env.DEV_DB_CONNECTION}`, {
        dbName: `${process.env.DB_NAME}`,
      });
      console.log(appConstant.DBCONNECTION.SUCCESSFUL);
    } catch (error: any) {
      console.error(appConstant.DBCONNECTION.UNSUCCESSFUL, error);
    }
  }
}
