"use strict";

const mongoose = require("mongoose");

// primero definimos un esquema
const productSchema = mongoose.Schema({
  name: { type: String, index: true },
  state: { type: Boolean, index: true },
  price: { type: Number, index: true },
  picture: String,
  tags: { type: [String], index: true }
});

// creamos un método estático (del modelo)
productSchema.statics.listar = function(
  filtro,
  skip,
  limit,
  sort,
  fields,
  callback
) {
  // obtenemos la query sin ejecutarla
  const query = Product.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec(callback);
};

// creamos el modelo
const Product = mongoose.model("Product", productSchema);

// exportamos el modelo
module.exports = Product;
