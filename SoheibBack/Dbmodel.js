const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  }
});

const password = mongoose.model("Password", noteSchema);

module.exports = password;