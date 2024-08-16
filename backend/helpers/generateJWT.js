const jwt = require("jsonwebtoken");
const generateToken = (username, email) => {
  const token = jwt.sign({ username, email }, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = generateToken;
