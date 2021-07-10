const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: String,
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  authToken: {
    type: String,
    required: true,
    default: "No token",
  },
  avatar: String,
  friends: Array,
  chats: Array,
  friendRequests: Array,
});

var Users = mongoose.model("Users", UserSchema);

module.exports = {
  Users,
};
