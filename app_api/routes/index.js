const express = require('express');
const router = express.Router();

const ctrlProducts = require('../controllers/product');

// products
router
  .route('/products')
  .get(ctrlProducts.productsList)
  .post(ctrlProducts.productsCreate);

router
  .route('/products/:productid')
  .get(ctrlProducts.productsReadOne)
  .put(ctrlProducts.productsUpdateOne)
  .delete(ctrlProducts.productsDeleteOne);

module.exports = router;
