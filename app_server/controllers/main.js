const index = (req, res) => {
  res.render('index', {
    title: 'Irish Mythology Store',
    pageHeader: { title: 'Irish Mythology Store', strapline: 'Explore handmade Celtic jewellery and Irish mythology books' },
    products: [
      { name:'Ireland Map Necklace', category:'Jewellery', manufacturer:'Betty & Biddy', price:28.00, description:'Silver necklace shaped as the map of Ireland, perfect for Irish heritage lovers.' },
      { name:'The Irish Mythological Cycle and Celtic Mythology', category:'Book', manufacturer:'AwesomeBooks', price:19.25, description:'A deep dive into the ancient Irish myth cycles, gods, and heroes.' },
      { name:'Children of Lir Sanctuary Pendant', category:'Jewellery', manufacturer:'Elena Brennan Jewellery', price:171.00, description:'Handcrafted pendant representing the tragic Children of Lir legend.' },
      { name:'Book of Invasions Print Edition', category:'Book', manufacturer:'Tuatha Press', price:24.50, description:'Modern annotated edition of the Lebor Gabála Érenn.' }
    ]
  });
};
module.exports = { index };