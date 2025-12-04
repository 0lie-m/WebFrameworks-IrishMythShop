const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = process.env.PRODUCTION_SERVER || apiOptions.server;
}

const _renderHomePage = function (req, res, responseBody) {
  let message = null;
  let products = [];

  if (responseBody instanceof Array) {
    products = responseBody;
    if (!products.length) {
      message = 'No products found.';
    }
  } else {
    message = 'API lookup error.';
  }

  res.render('index', {
    title: 'Irish Mythology Store',
    products,
    message
  });
};

const index = function (req, res) {
  const path = '/api/products';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    let data = body;

    if (err || !response || response.statusCode !== 200) {
      console.log('API error:', err || (response && response.statusCode));
      data = [];
    }

    _renderHomePage(req, res, data);
  });
};

const data = (req, res) => {
  res.render('data', {
    title: 'Data',
    pageHeader: {
      title: 'Product Data',
      strapline: 'Live data from MongoDB via Angular + API'
    }
  });
};

module.exports = {
  index,
  data
};


