const express = require("express");
const app = express();

const http = require("http").createServer(app);

const fetch = require("node-fetch");

const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});

const jwt = require("jsonwebtoken");

require("dotenv").config();

// middlewares
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

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("disconnect", () => console.log("socket disconnected"));

  socket.on("msg", (data) => {
    fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: data.username }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    // io.emit("broadcast", "broadcating...");
  });
});

http.listen("4000", () =>
  console.log("Socket Server listening on port 4000...")
);
