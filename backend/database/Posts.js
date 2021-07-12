const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  createdAt: {
    type: String,
    required: true,
    default: new Date().toLocaleString(),
  },
});

var Posts = mongoose.model("Posts", PostSchema);

module.exports = {
  Posts,
};
