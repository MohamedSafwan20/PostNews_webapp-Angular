const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  users: {
    type: Array,
    required: true,
  },
  messages: Array,
});

var Chats = mongoose.model("Chats", ChatSchema);

module.exports = {
  Chats,
};
