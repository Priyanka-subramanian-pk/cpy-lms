const tryCatchMiddleware = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.log(error);

     return res.status(500).json({
        message: "Somethingwentwrong",
        status: "failure",
        error_message: error.message,
      });
    }
  };
};
module.exports = tryCatchMiddleware;
