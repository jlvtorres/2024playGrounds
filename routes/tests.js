const express = require("express");
const logger = require("../services/logger");
const AppError = require("../classes/AppError");
const errorHandler = require("../services/errorHandler");
const fake = require("../middleware/fake");
const myTryCatch = require("../services/myTryCatch");
const { MISSING_DATA } = require("../errorCodes");
const router = express.Router();

const getUser = () => undefined;

//router.use(fake);
router.get(
      "/",
      myTryCatch(async (req, res, next) => {
            const user = getUser();
            if (!user) {
                  throw new AppError(MISSING_DATA, `There is no user dog (user=${user})`, 400);
            }

            return res.status(200).json({ success: true });
      })
);

router.get(
      "/s1",
      myTryCatch((req, res, next) => {
            throw new Error("Nooooooo");

            res.send("your all good");
      })
);

//router.use(errorHandler);

module.exports = router;
