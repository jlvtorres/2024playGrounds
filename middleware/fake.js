const fake = (req, res, next) => {
      console.log(`The fake middle ware ran`);

      return next();
      //console.log();
};

module.exports = fake;
