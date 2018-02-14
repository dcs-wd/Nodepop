"use strict";

/**
 * Modulo para conectar con MongoDB
 */
const mongoose = require("mongoose");
const conn = mongoose.connection;

conn.on("error", err => {
  console.log("Error de conexión con MongoDB", err);
  process.exit(1);
});

conn.once("open", () => {
  console.log("Conectado a MongoDB en", mongoose.connection.name);
});

// Modo de conexión lazy
mongoose.connect("mongodb://localhost/nodepop", {
  useMongoClient: true
});
