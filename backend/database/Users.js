const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  friends: Array,
  chats: Array,
  friendRequests: Array,
});

var User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
