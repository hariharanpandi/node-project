import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import AppConstants from "./utils/constant";
const routes = require('./routes/routes');
const connections = require('./database/db')
require('dotenv').config();

const app = express();
const appConstant = new AppConstants();
const port = process.env.PORT ?? 5001;

// To configure Application json 
//Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(helmet());
app.use(cors());

connections
    .then(() => { console.log(appConstant.DBCONNECTION.SUCCESSFUL); })
    .catch((error: any) => { console.error(appConstant.DBCONNECTION.UNSUCCESSFUL, error); });

//Over All routes
// app.use('/api', routes.route);

app.listen(port, () => {
    console.log(appConstant.MESSAGES.PORT_LISTEN + `${port}`);
});