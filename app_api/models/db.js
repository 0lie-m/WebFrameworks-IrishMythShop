const mongoose = require('mongoose');

const usersURI =
  "mongodb+srv://oliver:mtu123@cluster0.xccuakv.mongodb.net/irishMyth?retryWrites=true&w=majority";

const productsURI =
  "mongodb+srv://oliver:mtu123@cluster0.xccuakv.mongodb.net/irishMyth?retryWrites=true&w=majority";


const usersConn = mongoose.createConnection(usersURI);
const productsConn = mongoose.createConnection(productsURI);

usersConn.on("connected", () =>
  console.log(`Mongoose (USERS) connected to ${usersURI}`)
);

productsConn.on("connected", () =>
  console.log(`Mongoose (PRODUCTS) connected to ${productsURI}`)
);

// Load models
require("./user")(usersConn);
require("./product")(productsConn);

module.exports = { usersConn, productsConn };
