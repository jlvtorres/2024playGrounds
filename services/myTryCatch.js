//this function abstracts out the try/catch so that you can
//use it in the route handlers and that way they look cleaner
const myTryCatch = (routeFunction) => async (req, res, next) => {
      try {
            await routeFunction(req, res, next);
      } catch (error) {
            next(error);
            return;
      }
};

module.exports = { myTryCatch };
