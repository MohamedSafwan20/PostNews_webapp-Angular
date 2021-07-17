const express = require("express");
const app = express();

const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origins: [process.env.BASE_URL],
  },
});

const axios = require("axios");

require("dotenv").config();

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("join", (room) => {
    socket.join(room);
  });

  socket.on("message", (data) => {
    axios
      .post(`${process.env.DB_SERVER_URL}/chat-message`, {
        chatData: data,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    io.to(data.room).emit("new message", data.message);
  });

  socket.on("disconnect", () => console.log("socket disconnected"));
});

http.listen("4000", () =>
  console.log("Socket Server listening on port 4000...")
);
