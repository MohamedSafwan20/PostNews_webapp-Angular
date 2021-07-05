const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/PostNews", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connection to db successful!"))
  .catch((err) => {
    console.log("Error connecting to db");
    console.log(err.reason);
  });

const { v4: uuid } = require("uuid");

const { User } = require("./database/Users");

// middlewares
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// end of middlewares

app.get("/db", (req, res) => {
  console.log("User.find({}");
  User.find({}, (err, data) => {
    console.log("err");
    console.log(err);
    console.log("data");
    console.log(data);
  });
  res.end();
  // res.send(User.find({}));
});

app.post("/db", (req, res) => {
  var carlo = new User({
    uid: uuid(),
    fullname: "test",
    username: "joe",
    email: "joe@carlo.com",
    password: "23432s",
  });
  carlo.save((err, data) => {
    if (!err) res.status(200).send("successful");
  });
});

app.listen("3000", () => console.log("Server listening on port 3000..."));
