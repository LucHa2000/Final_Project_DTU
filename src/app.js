const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash"); //flash session
const cookieParser = require("cookie-parser");
var exphbs = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
const route = require("./routes");
const server = require("http").Server(app);
const moment = require("moment");
var io = require("socket.io")(server);
const nodemailer = require("nodemailer");
require("dotenv").config();
//parsing middleware
//parse application/s-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser()); // use cookie
app.use(
  session({
    secret: "keyboard cat",

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
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(` Server run at http://localhost:${port}`);
});

route(app);
