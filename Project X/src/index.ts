const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const connections = require("./database/db");
const winston = require("winston");
//Import all Routes
const routes = require("./routes/routes");

const app = express();

const port = process.env.PORT ?? 5000;

// To configure Application json
//Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(helmet());
app.use(cors());

connections
  .then(() => {
    console.log("Database successfully connected...");
  })
  .catch((error: any) => {
    console.error("Connection failed", error);
  });

//Over All routes
app.use("/api", routes.route);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
