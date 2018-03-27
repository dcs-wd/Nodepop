"use strict";

/**
 * @api Request product information
 * @apiName Connect with MongoDB
 * @apiGroup Data Base
 *
 * @apiSuccess HTTP status code with JSON.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "Connect with MongoDB"
 *     }
 *
 * @apiError We can't connect with MongoDB.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "error": "Can't connect with MongoDB"
 *     }
 */
const mongoose = require("mongoose");
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on("error", err => {
  console.log("Error de conexión con MongoDB", err);
  process.exit(1);
});

conn.once("open", () => {
  console.log("Conectado a MongoDB en", mongoose.connection.name);
});

mongoose.connect("mongodb://localhost/nodepop");
