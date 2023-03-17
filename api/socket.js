const User = require("./models/userModel");
const { saveMessages,getMessagesForUser } = require("./src/Messages");
const findMessagesForUser = (userId) => {
  const messagesPerUser = new Map();
  getMessagesForUser(userId).forEach((message) => {
    const otherUser = message.from == userId ? message.to : message.from;
    if(messagesPerUser.has(otherUser)){
      messagesPerUser.get(otherUser).push(message);
    }else{
      messagesPerUser.set(otherUser,[message]);
    }
  });
  return messagesPerUser;
}
exports.socketHandler = (io) => {
  io.on("connection", (socket) => {
    const userMessages = findMessagesForUser(socket.userId);
    User.find().then((users) => {
      const allusers = users.map((user) => {
        return {
          userId: user._id,
          username: user.name,
          image: user.avtar.url,
          connected: false,
          messages: userMessages.get(user._id) || []
        };
      });
      for (let [id, socket] of io.of("/").sockets) {
        allusers.forEach((user) => {
          if (user.userId == socket.userId) {
            user.connected = true;
          }
        });
      }
      io.emit("users", allusers);
    });
    socket.join(socket.userId);
    socket.on("private", ({ message, to }) => {
      const newMessage = {
        from: socket.userId,
        message,
        to,
      };
      saveMessages(newMessage);
      socket.to(to).emit("private", newMessage);
      socket.emit("private", newMessage);
    });
    socket.on("user messages", ({userId,username}) => {
      const messages = findMessagesForUser(socket.userId);
      socket.emit("user messages", {
        userId,
        username,
        messages: messages.get(userId) || []
      })
    })
    socket.on("disconnect", () => {
      User.find().then((users) => {
        const allusers = users.map((user) => {
          return {
            userId: user._id,
            username: user.name,
            image: user.avtar.url,
            connected: false,
          };
        });
        for (let [id, socket] of io.of("/").sockets) {
          allusers.forEach((user) => {
            if (user.userId == socket.userId) {
              user.connected = true;
            }
          });
        }
        io.emit("users", allusers);
      });
    });
  });
};

// io.emit() sends to all connected clients with you
// socket.emit() sends to the client that sent the message
// socket.broadcast.emit() sends to all connected clients except you
// socket.on() listens for messages from the client
