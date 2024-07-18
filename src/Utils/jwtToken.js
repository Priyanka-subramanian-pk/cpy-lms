const jwt = require('jsonwebtoken');

const tokenVerifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({
      error: "Unauthorized"
    });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  jwt.verify(token, process.env.JWT_SECRETKEY, (error, decoded) => {
    if (error) {
      return res.status(400).json({
        error: "Invalid token"
      });
    }
    req.user = decoded;
    console.log("req.user", req.user);
    next();
  });
};

module.exports = tokenVerifyAdmin;
