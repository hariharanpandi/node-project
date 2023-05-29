// Mongo db Connections
import mongoose from "mongoose";
import AppConstants from '../utils/constant';
require('dotenv').config();

const appConstant = new AppConstants();

const connection = mongoose.connect(`${process.env.DEV_DB_CONNECTION}`, { dbName: `${process.env.DEV_DB}` });

module.exports = connection;