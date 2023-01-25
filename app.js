import express from "express";
import { Server } from "socket.io";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to custom chess!");
});

const httpServer = app.listen(3000, () => console.log("Server running"));
const io = new Server(httpServer);

const SECOND = 1000;

io.timeout(SECOND * 7);
io.connectTimeout(SECOND * 7);

io.on("connection", (socket) => {
  console.log("Client connected");
});

io.on("disconnection", (socket) => {
  console.log("Client disconnected");
});
