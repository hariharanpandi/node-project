import mongoose from "mongoose";
require('dotenv').config();
/**
 * MongoDB database connection 
 */
const connection = mongoose.connect(`${process.env.DEV_DB_CONNECTION}`, { dbName: `${process.env.DEV_DB}` });

module.exports = connection;