const mongoose = require('mongoose');

let usersURI = 'mongodb://localhost/UsersDB';
let productsURI = 'mongodb://localhost/ProductsDB';

if (process.env.NODE_ENV === 'production') {
  usersURI    = process.env.MONGODB_URI_USERS;
  productsURI = process.env.MONGODB_URI_PRODUCTS;
}

// create two connections
const usersConn    = mongoose.createConnection(usersURI);
const productsConn = mongoose.createConnection(productsURI);


usersConn.on('connected', () => console.log(`Mongoose (USERS) connected to ${usersURI}`));
productsConn.on('connected', () => console.log(`Mongoose (PRODUCTS) connected to ${productsURI}`));


require('./user')(usersConn);
require('./product')(productsConn);

module.exports = { usersConn, productsConn };
