const jwt = require("jsonwebtoken");

const authMiddleware = async (req, _, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken)
    if (decodedToken) {
      req.user = decodedToken.username;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleware;
