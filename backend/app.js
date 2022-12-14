const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const errorMiddleware = require("./middleware/error");
const course = require("./routes/courseRoute.js");
const user = require("./routes/userRoute.js");

app.use("/api/v1", course);
app.use("/api/v1", user);

app.use(errorMiddleware);

module.exports = app;
