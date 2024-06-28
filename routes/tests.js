const express = require("express");
const logger = require("../services/logger");
const errorHandler = require("../middleware/errorHandler");
const fake = require("../middleware/fake");
const myTryCatch = require("../services/myTryCatch");
const router = express.Router();

const getUser = () => undefined;

router.use(fake);
router.get("/", async (req, res, next) => {
      try {
            const user = getUser();
            if (!user) {
                  throw new Error("user not found");
            }
      } catch (error) {
            logger.error(error);
            return next(error);
      }

      return res.status(200).json({ success: true });
});

router.get(
      "/s1",
      myTryCatch((req, res, next) => {
            throw new Error("Nooooooo");

            res.send("your all good");
      })
);

router.use(errorHandler);

module.exports = router;
