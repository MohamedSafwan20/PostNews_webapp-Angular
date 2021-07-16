const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
});

var Chats = mongoose.model("Chats", ChatSchema);

module.exports = {
  Chats,
};
