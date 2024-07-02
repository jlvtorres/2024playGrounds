//gets the proper .env file to use based on which script is ran from package.json file
const envPath = `./configs/.env.${process.env.NODE_ENV}`;
require("dotenv").config({ path: envPath });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("./services/logger");
const errorHandler = require("./services/errorHandler");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const testing = require("./routes/tests");
app.use("/", testing);

app.get("/t2", (req, res, next) => {
      const error = new Error("Naaa daaag");
      next(error);
      res.send("Nixce");
});
app.use(errorHandler);

const port = process.env.SERVER_PORT;
app.listen(port, () => {
      console.log(`server running on port ${port} at http://localhost:${port}/`);
});
