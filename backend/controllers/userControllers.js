const generateToken = require("../helpers/generateJWT");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ msg: "incomplete details" });
  const isUserPresent = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (isUserPresent !== null)
    return res.status(409).json({ msg: "user already present." });
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const token = generateToken(username, email);
    await User.create({
      username,
      email,
      password: encryptedPassword,
      token,
    });
    return res.status(201).json({
      username,
      email,
      token,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "some error occured during registering user.", err: err });
  }
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password)
    return res.status(400).json({ msg: "incomplete details." });
  try {
    const isUserPresent = await User.findOne({
      $or: [{ username: userName }, { email: userName }],
    });
    if (isUserPresent === null)
      return res.status(401).json({ msg: "user is not present." });
    else {
      if (await bcrypt.compare(password, isUserPresent.password))
        return res.status(201).json({
          username: isUserPresent.username,
          email: isUserPresent.email,
          token: isUserPresent.token,
        });
      else return res.status(401).json({ msg: "wrong credentials." });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "some error occured during login.", err });
  }
};

module.exports = { registerUser, loginUser };
