"use strict";

const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");

/**
 * @api {get} /:id Request product information
 * @apiName GetProduct
 * @apiGroup Query products
 *
 * @apiSuccess {String} name Name of the Product.
 * @apiSuccess {Boolean} state State of the Product.
 * @apiSuccess {Number} price Price of the Product.
 * @apiSuccess {String} image URL of the product's image.
 * @apiSuccess {String} tags Tag/s of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "iPhone 3GS",
 *       "state": false,
 *       "price": 50.00,
 *       "image": "iphone.png",
 *       "tags": [ "lifestyle", "mobile"]
 *     }
 *
 * @apiError ProductNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const state = req.query.state;
    const price = req.query.price;
    const tags = req.query.tags;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const fields = req.query.fields;

    console.log(req.query);

    const filtro = {};
    // Adding filters
    if (typeof name !== "undefined") {
      filtro.name = name;
    }

    if (typeof state !== "undefined") {
      filtro.state = state;
    }

    if (typeof price !== "undefined") {
      filtro.price = price;
    }

    if (typeof tags !== "undefined") {
      filtro.tags = tags;
    }

    const docs = await Product.listar(filtro, skip, limit, sort, fields); // si usamos await, la función donde estoy
    // debe tener async

    res.json({ success: true, result: docs });
  } catch (err) {
    next(err);
    return;
  }
});

/**
 * @api {post} /:id Update a list of products or a product
 * @apiName PostProduct
 * @apiGroup Update products
 *
 * @apiSuccess {String} name of the Product.
 * @apiSuccess {Boolean} state of the Product.
 * @apiSuccess {Number} price of the Product.
 * @apiSuccess {String} image URL of the product's image.
 * @apiSuccess {String} tags of the Product.
 * @apiError ProductNotFound The id of the Product was not found.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "iPhone 5S",
 *       "state": false,
 *       "price": 246.00,
 *       "image": "iphone5s.png",
 *       "tags": [ "tech", "mobile"]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
router.post("/", (req, res, next) => {
  console.log(req.body);

  const data = req.body;

  // creamos documento de agente en memoria
  const product = new Product(data);

  Product.save((err, saveProduct) => {
    // .save es método de instancia
    if (err) {
      next(err);
      return;
    }
    res.json({ success: true, result: saveProduct });
  });
});

/**
 * @api {delete} /:id Delete a list of products or a product
 * @apiName DeleteProduct
 * @apiGroup Delete products
 *
 * @apiSuccess {String} name of the Product.
 * @apiSuccess {Boolean} state of the Product.
 * @apiSuccess {Number} price of the Product.
 * @apiSuccess {String} image URL of the product's image.
 * @apiSuccess {String} tags of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "El producto ha sido eliminado correctamente"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Product.remove({ _id: _id }).exec(); // .remove es método estático
    res.json({ success: true });
  } catch (err) {
    next(err);
    return;
  }
});

/**
 * @api {put} /:id Update a list of products or a product
 * @apiName PutProduct
 * @apiGroup Update products
 *
 * @apiSuccess {String} name of the Product.
 * @apiSuccess {Boolean} state of the Product.
 * @apiSuccess {Number} price of the Product.
 * @apiSuccess {String} image URL of the product's image.
 * @apiSuccess {String} tags of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "iPhone X",
 *       "state": true,
 *       "price": 1246.00,
 *       "image": "iphoneX.png",
 *       "tags": [ "smartphone"]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */
router.put("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;

    const updateProduct = await Product.findByIdAndUpdate(_id, data, {
      new: true // esto es para obtener la nueva versión del documento
      // tras actualizarlo
    });

    res.json({ success: true, result: updateProduct });
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
