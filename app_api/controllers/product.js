const { productsConn } = require('../models/db');
const getProductModel = require('../models/product');
const Product = getProductModel(productsConn);

// GET /api/products
const productsList = function (req, res) {
  Product
    .find()
    .then(products => {
      res
        .status(200)
        .json(products);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error retrieving products', error: err });
    });
};

// POST /api/products
const productsCreate = function (req, res) {
  Product
    .create({
      name:         req.body.name,
      type:         req.body.type,
      description:  req.body.description,
      price:        req.body.price,
      manufacturer: req.body.manufacturer,
      quantity:     req.body.quantity,
      status:       req.body.status,
      tags:         req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : []
    })
    .then(product => {
      res
        .status(201)
        .json(product);
    })
    .catch(err => {
      res
        .status(400)
        .json({ message: 'Error creating product', error: err });
    });
};

// GET /api/products/:productid
const productsReadOne = function (req, res) {
  if (req.params && req.params.productid) {
    Product
      .findById(req.params.productid)
      .then(product => {
        if (!product) {
          return res
            .status(404)
            .json({ message: 'productid not found' });
        }
        res
          .status(200)
          .json(product);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'Error retrieving product', error: err });
      });
  } else {
    res
      .status(400)
      .json({ message: 'No productid in request' });
  }
};

// PUT /api/products/:productid
const productsUpdateOne = function (req, res) {
  if (!req.params || !req.params.productid) {
    return res
      .status(400)
      .json({ message: 'No productid in request' });
  }

  Product
    .findById(req.params.productid)
    .then(product => {
      if (!product) {
        return res
          .status(404)
          .json({ message: 'productid not found' });
      }

      product.name         = req.body.name || product.name;
      product.type         = req.body.type || product.type;
      product.description  = req.body.description || product.description;
      product.price        = req.body.price ?? product.price;
      product.manufacturer = req.body.manufacturer || product.manufacturer;
      product.quantity     = req.body.quantity ?? product.quantity;
      product.status       = req.body.status || product.status;
      product.tags         = req.body.tags
        ? req.body.tags.split(',').map(t => t.trim())
        : product.tags;

      return product.save();
    })
    .then(updated => {
      if (updated) {
        res
          .status(200)
          .json(updated);
      }
    })
    .catch(err => {
      res
        .status(400)
        .json({ message: 'Error updating product', error: err });
    });
};

// DELETE /api/products/:productid
const productsDeleteOne = function (req, res) {
  if (!req.params || !req.params.productid) {
    return res
      .status(400)
      .json({ message: 'No productid in request' });
  }

  Product
    .findByIdAndDelete(req.params.productid)
    .then(result => {
      if (!result) {
        return res
          .status(404)
          .json({ message: 'productid not found' });
      }
      res
        .status(204)
        .json(null);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Error deleting product', error: err });
    });
};

module.exports = {
  productsList,
  productsCreate,
  productsReadOne,
  productsUpdateOne,
  productsDeleteOne
};
