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
  avatar: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  joinedOn: {
    type: String,
    required: true,
    default: new Date().getFullYear(),
  },
  friends: Array,
  friendRequests: Array,
});

var Users = mongoose.model("Users", UserSchema);

module.exports = {
  Users,
};
