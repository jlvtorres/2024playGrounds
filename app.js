//gets the proper .env file to use based on which script is ran from package.json file
const envPath = `./configs/.env.${process.env.NODE_ENV}`;
require("dotenv").config({ path: envPath });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("./services/logger");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/t1", (req, res) => {
      logger.debug("testing logger");
      res.send("Your goood");
});
const port = process.env.SERVER_PORT;
app.listen(port, () => {
      console.log(`server running on port ${port} at http://localhost:${port}/`);
});
