const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/PostNews", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connection to db successful!"))
  .catch((err) => {
    console.log("Error connecting to db");
    console.log(err.reason);
  });

const jwt = require("jsonwebtoken");

require("dotenv").config();

const { Users } = require("./database/Users");
const { Posts } = require("./database/Posts");
const { Chats } = require("./database/Chats");

// middlewares
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (token == null) return res.send({ message: "No token", success: 0 });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.send({ message: "Error: jwt can't be verified", success: 0 });
    }

    req.username = user;

    next();
  });
};
// end of middlewares

// saving user in db
app.post("/signup", (req, res) => {
  var user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  Users.countDocuments({ username: req.body.username }).then((count) => {
    if (count === 0) {
      user.save((err, data) => {
        if (err) {
          console.log("Signing in Error: ");
          console.log(err);
          res.sendStatus(400);
        }
        if (data) {
          res.send({ message: "User created successfully", success: 1 });
        }
      });
    } else res.send({ message: "Username already exists!", success: 0 });
  });
});

// Logging user in
app.post("/login", (req, res) => {
  // creating jsonwebtoken for signing in user
  const token = jwt.sign(req.body.username, process.env.TOKEN_SECRET);
  // End of creating jsonwebtoken

  Users.findOneAndUpdate(
    { username: req.body.username },
    { authToken: token },
    { new: true }
  )
    .then((data) => {
      if (data.password === req.body.password)
        res.send({
          token: data.authToken,
          message: "Successful Login",
          success: 1,
        });
      else res.send({ message: "Incorrect Password", success: 0 });
    })
    .catch((err) => res.send({ message: "No Account exists", success: 0 }));
});

// getting posts from db
app.get("/posts", verifyToken, (req, res) => {
  Posts.find({}, null, { sort: { createdAt: -1 } }, (err, data) => {
    if (err) {
      console.log("Error getting posts: ");
      console.log(err);
      res.send({ message: "No posts", success: 0 });
    }
    if (data) res.send({ data: data, success: 1 });
  });
});

// getting single post from db
app.get("/posts/:id", verifyToken, (req, res) => {
  Posts.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log("Error getting post: ");
      console.log(err);
      res.send({ message: "can't find post in db", success: 0 });
    } else if (data) res.send({ data: data, success: 1 });
    else res.send({ message: "invalid post id", success: 0 });
  });
});

// Saving post to db
app.post("/posts", verifyToken, async (req, res) => {
  var post = new Posts({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    author: req.username,
  });

  post.save((err, data) => {
    if (err) {
      console.log("Error while saving post: ");
      console.log(err);
      res.sendStatus(400);
    }
    if (data) {
      res.send({ message: "Post created successfully", success: 1 });
    }
  });
});

// getting user details from db
app.get("/user", verifyToken, (req, res) => {
  Users.findOne({ username: req.username }, (err, data) => {
    if (err) {
      console.log("Error getting user details: ");
      console.log(err);
      res.send({ message: "can't find user in db", success: 0 });
    } else if (data) res.send({ data: data, success: 1 });
    else res.send({ message: "invalid username", success: 0 });
  });
});

// updating user details in db
app.patch("/user", verifyToken, (req, res) => {
  Users.findOneAndUpdate(
    { username: req.username },
    {
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
    },
    { new: true }
  )
    .then((data) => {
      res.send({
        message: "Successful edit",
        success: 1,
      });
    })
    .catch((err) =>
      res.send({ message: "can't edit user details", success: 0 })
    );
});

// getting user posts from db
app.get("/user-posts", verifyToken, (req, res) => {
  Posts.find(
    { author: req.username },
    null,
    { sort: { createdAt: -1 } },
    (err, data) => {
      if (err) {
        console.log("Error getting user posts: ");
        console.log(err);
        res.send({ message: "No posts for this user", success: 0 });
      }
      if (data) res.send({ data: data, success: 1 });
    }
  );
});

// updating user post in db
app.patch("/user-posts", verifyToken, (req, res) => {
  Posts.findOneAndUpdate(
    { _id: req.body.id },
    {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    },
    { new: true }
  )
    .then((data) => {
      res.send({
        message: "Post Successfully edited",
        success: 1,
      });
    })
    .catch((err) =>
      res.send({ message: "can't edit user details", success: 0 })
    );
});

// deleting single post from db
app.delete("/user-posts/:id", verifyToken, (req, res) => {
  Posts.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log("Error deleting post: ");
      console.log(err);
      res.send({ message: "can't find post in db", success: 0 });
    } else if (data)
      res.send({ message: "Post successfully deleted", success: 1 });
    else res.send({ message: "invalid post id", success: 0 });
  });
});

// getting all users except one from db
app.get("/users", verifyToken, (req, res) => {
  Users.find(
    {
      username: { $ne: req.username },
    },
    { username: 1, avatar: 1, _id: 0 },
    (err, data) => {
      if (err) {
        console.log("Error getting users: ");
        console.log(err);
        res.send({ message: "can't find users in db", success: 0 });
      } else if (data)
        res.send({
          data: data,
          success: 1,
        });
      else res.send({ message: "Bad gateway", success: 0 });
    }
  );
});

// checking whether chat room exists or not in db
app.post("/chat-room", verifyToken, (req, res) => {
  Chats.findOne(
    { users: { $all: [req.username, req.body.usernameOfChatUser] } },
    { _id: 1 },
    (err, data) => {
      if (err) {
        console.log("Error getting room details: ");
        console.log(err);
        res.send({ message: "can't find room in db", success: 0 });
      } else if (data) res.send({ data: data, success: 1 });
      else res.send({ message: "No room with these users", success: 0 });
    }
  );
});

// creating chat room in db
app.post("/create-chat-room", verifyToken, (req, res) => {
  var chat = new Chats({
    users: [req.username, req.body.usernameOfChatUser],
  });

  chat.save((err, data) => {
    if (err) {
      console.log("Error while saving chat room: ");
      console.log(err);
      res.sendStatus(400);
    }
    if (data) {
      res.send({
        id: data._id,
        message: "Room created successfully",
        success: 1,
      });
    }
  });
});

app.listen("3000", () => console.log("Db Server listening on port 3000..."));
