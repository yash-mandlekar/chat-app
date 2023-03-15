exports.socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.on("send_message", (data) => {
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("disconnect_user","user disconnected");
      console.log("user disconnected");
    });
  });
};

// io.emit() sends to all connected clients with you
// socket.emit() sends to the client that sent the message
// socket.broadcast.emit() sends to all connected clients except you
// socket.on() listens for messages from the client
