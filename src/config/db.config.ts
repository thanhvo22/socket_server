
import * as dotenv from "dotenv";
require("dotenv").config();

const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb+srv://thanhvo:2212@test-socket.ot0ez.mongodb.net/?retryWrites=true&w=majority");
    console.log("connecting successfully hhhh");
  } catch (error) {
    console.log("failllllllllll");
  }
}
module.exports = { connect };
