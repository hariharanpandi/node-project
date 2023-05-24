import express from "express";
import cors from "cors";
import helmet from "helmet";
import AppConstants from "./utils/appconstants";
import Database from "./database/db";
require("dotenv").config();
import winston from "winston";
//Import all Routes
const routes = require("./routes/routes");
const appConstant=new AppConstants();
const app = express();

const port = process.env.PORT ?? 5000;

// To configure Application json
//Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(helmet());
app.use(cors());

const database = new Database();
database.connect();

//Over All routes
app.use(appConstant.URL.BASE_URL, routes.route);

app.listen(port, () => {
  console.log(appConstant.MESSAGES.PORT_LISTEN+`${port}`);
});
