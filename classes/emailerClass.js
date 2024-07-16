// i made this new on 6-27-2024 and the only place currently using it is in termination route for
//confirming emailing for hr and helpdesk when they finish there due parts

const nodemailer = require("nodemailer");
const logger = require("../services/logger");
const { error } = require("console");

class Emailer {
      constructor() {
            this.transporter = nodemailer.createTransport({
                  name: process.env.EMAIL_CONFIG_NAME,

                  host: process.env.EMAIL_CONFIG_HOST,
                  port: process.env.EMAIL_CONFIG_PORT,
                  secureConnection: false,
                  auth: {
                        user: process.env.EMAIL_CONFIG_USER,
                        pass: process.env.EMAIL_CONFIG_PASS,
                  },
            });

            this.mailOptions = null;

            logger.debug(` in Emailer class using .env file of: "${process.env.NODE_ENV}"`);
      }

      setMailOption = (options) => {
            //       const emailFields = ({ from, to, subject, text, html } = options);

            this.mailOptions = options;
      };

      sendEmail = () => {
            this.transporter.sendMail(this.mailOptions, (err, info) => {
                  if (err) {
                        logger.error(err);
                        throw error;
                  } else {
                        logger.debug(`Result of email=${JSON.stringify(info, null, 4)}`);
                        return info;
                  }
            });
      };
}

module.exports = Emailer;
