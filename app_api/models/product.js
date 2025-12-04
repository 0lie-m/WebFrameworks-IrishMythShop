const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  type:         { type: String, required: true, trim: true },
  description:  { type: String, default: '' },
  price:        { type: Number, required: true },
  manufacturer: { type: String, default: '' },
  quantity:     { type: Number, default: 0 },
  status:       { type: String, default: 'active' },
  tags:         { type: [String], default: [] },
  createdAt:    { type: Date, default: Date.now }
}, { collection: 'Product' });

module.exports = function(conn) {
  return conn.models.Product || conn.model('Product', productSchema, 'Product');
};
