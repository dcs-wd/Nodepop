"use strict";

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Db middleware
require("./lib/connectMongoose");
// Cargamos las definiciones de todos nuestros modelos
require("./models/Product");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Global Template variables
app.locals.title = "NodePop";

// Middleware de mi aplicación web
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// API middleware
app.use("/apiv1/products", require("./routes/apiv1/products"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (err.array) {
    // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  // establezco el status a la respuesta
  err.status = err.status || 500;
  res.status(err.status);

  // si es una petición de API, respondemos con JSON
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }

  // Respondo con un JSON si la petición viene de la API
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

function isAPI(req) {
  return req.originalUrl.indexOf("/apiv") === 0;
}

module.exports = app;
