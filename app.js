//gets the proper .env file to use based on which script is ran from package.json file
const envPath = `./configs/.env.${process.env.NODE_ENV}`;
require("dotenv").config({ path: envPath });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("./services/logger");
const EmailScheduler = require("./classes/EmailScheduler");
const errorHandler = require("./services/errorHandler");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const testing = require("./routes/tests");
const myTryCatch = require("./services/myTryCatch");
app.use("/", testing);

app.get(
      "/t5",
      myTryCatch((req, res, next) => {
            logger.error("----");

            const options = {
                  from: process.env.EMAIL_CONFIG_EMAIL,
                  to: "joseluis3506@gmail.com",
                  subject: `This is the subject line`,
            };
            const emailScheduler = new EmailScheduler(options, "2024-07-03", "19:57");
            emailScheduler.scheduleEmail();

            res.send("Nixce");
      })
);

app.get("/timepicker", (req, res) => {
      console.log("it ran");
      res.render("timepicker");
});

app.use(errorHandler);

const port = 1000; //process.env.SERVER_PORT;
app.listen(port, () => {
      console.log(`server running on port ${port} at http://localhost:${port}/`);
});
