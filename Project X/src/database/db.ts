// Mongo db Connections
import dotenv from "dotenv"
import mongoose from "mongoose";
import Config from "../config/config";

dotenv.config();

const dbConfig = new Config();

const connection = mongoose.connect(`${dbConfig.DEV_DB_CONNECTION}`)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error: any) => {
      console.error('MongoDB connection error', error);
    });

module.exports = connection;
