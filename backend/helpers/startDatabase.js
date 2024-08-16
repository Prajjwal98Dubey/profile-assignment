const mongoose = require("mongoose");
const startDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {});
  console.log("db connected.");
};

module.exports = startDB;
