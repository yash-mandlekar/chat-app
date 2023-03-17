require("dotenv").config({ path: "./.env" });
var createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const { socketHandler } = require("./socket");
const PORT = process.env.PORT || 4000;
const indexRouter = require("./routes/indexRoute");
app.use(
  require("cors")({
    origin: ["http://localhost:3000","https://chat-app-cyan-five.vercel.app"],
    credentials: true,
  })
  );
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ["https://chat-app-cyan-five.vercel.app","http://localhost:3000"],
    },
  });
  
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  const userId = socket.handshake.auth.userId;
  const image = socket.handshake.auth.image;
  if(username && userId) {
    socket.username = username;
    socket.userId = userId;
    socket.image = image;
    return next();
  }
  return next(new Error("Authentication error"));
});

socketHandler(io);
// databaseconnection
require("./models/database").databaseconnection();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "jk43t9",
  })
);

// app.use(require("cors")({ credentials: true }));

app.use("/api/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(500).json({ error: err });
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "views", "build")));
    res.sendFile(path.resolve(__dirname, "views", "build", "index.html"));
  });
}

server.listen(PORT, () => console.log(`server running on port: ${PORT}`));
