const Emailer = require("../classes/emailerClass");
const cron = require("node-cron");

class EmailScheduler {
      constructor(emailOptions, date, time) {
            this.emailOptions = emailOptions;
            this.date = date;
            this.time = time;
            this.emailer = new Emailer();
      }

      scheduleEmail = () => {
            const [hour, minute] = this.time.split(":");
            const [year, month, day] = this.date.split("-");
            const cronExpression = `${minute} ${hour} ${day} ${month} *`;
            console.log(`${minute} ${hour} ${day} ${month} ${year}`);
            cron.schedule(
                  cronExpression,
                  () => {
                        console.log("it works");

                        this.emailer.setMailOption(this.emailOptions);
                        this.emailer.sendEmail();
                        console.log("Email sent");
                  },
                  {
                        scheduled: true,
                        timezone: "America/Los_Angeles",
                  }
            );

            console.log(`Email scheduled for ${this.date} at ${this.time}`);
      };
}

module.exports = EmailScheduler;
