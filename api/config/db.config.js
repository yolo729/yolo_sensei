"use strict";

const mongoose = require("mongoose");

//local mysql db connection
const connectDb = async () => {
  try {
    const mongo_url = "mongodb://127.0.0.1:27017/salesensei";
    await mongoose.connect(mongo_url);
    console.log("Database connected: ");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
