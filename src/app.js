const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash"); //flash session
const cookieParser = require("cookie-parser");
var exphbs = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const route = require("./routes");
const port = process.env.PORT || 4000;
const server = require("http").Server(app);
const moment = require("moment");
var io = require("socket.io")(server);
const nodemailer = require("nodemailer");
const { isObject } = require("util");
require("dotenv").config();

//parsing middleware
//parse application/s-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser()); // use cookie
app.use(
    session({
        secret: "keyboard cat",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 180 * 60 * 1000,
            secure: false,
        },
    })
);
app.use(flash());
app.use(morgan("combined"));
//parse application/json
app.use(express.json());
//template Engine
//app.engine('hbs',exphbs({extname: '.hbs'}))
app.engine(
    "hbs",
    exphbs({
        extname: ".hbs", //config hbs
        helpers: require("./helpers/hbs"),
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
//socket io in server
server.listen(port, () => {
    console.log(` Server run at http://localhost:${port}`);
});
const arrayUser = [];
const usersId = [];

const arrayUserGroup = [];
const userIdGroup = [];
//check connect
io.on("connection", (socket) => {
    console.log("have a connect ID :" + socket.id);

    // chat private
    // listening  username
    socket.on("user-name", (data) => {
        arrayUser.push(data);
        socket.Username = data;
        usersId[data] = socket.id;
        socket.emit("Server-success-regsiter", data);
    });
    //listening content
    socket.on("content-message", (data) => {
        var socketId = usersId[data.receiver];

        io.to(socketId).emit("new-message-private", data);
    });
    //listening emotion
    socket.on("content-emotion", (data) => {
        var socketId = usersId[data.receiver];
        io.to(socketId).emit("new-message-private-emotion", data);
    });
    //listening user write
    socket.on("user-writing", (data) => {
        socket.broadcast.emit("server-send-user-write", data);
    });
    //stop listening user write
    socket.on("user-write-stop", (data) => {
        io.sockets.emit("server-send-user-write-stop");
    });

    //chat group
    var userMember = "";
    //join group
    socket.on("new-join", (data) => {
        userMember = data;
        if (arrayUserGroup.indexOf(data) == -1) {
            arrayUserGroup.push(data);
            socket.broadcast.emit("new-member-joined", data);
            io.sockets.emit("list-member-joined", arrayUserGroup);
        } else {
            return;
        }
    });
    //out group
    socket.on("disconnect", (data) => {
        arrayUserGroup.splice(arrayUserGroup.indexOf(userMember), 1);
        io.sockets.emit("member-out-group", arrayUserGroup);
    });
    //listening content group
    socket.on("content-message-group", (data) => {
        socket.broadcast.emit("new-message-group", data);
    });
    //listening emotion
    socket.on("content-emotion-group", (data) => {
        socket.broadcast.emit("new-message-group-emotion", data);
    });
});
route(app);