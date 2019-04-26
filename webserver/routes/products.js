const ProductsRoutes = module.exports = {}

// Require controllers
const products = require('../../controller/products')

ProductsRoutes.index = (req, res, next) => {
  products.list().then(data => {
    res.render('products',{
      products: data
    })
  })
}

ProductsRoutes.show = (req, res, next) => {
  let id = Number(req.params.id)
  products.find(id)
    .then(data => res.send(data))
}
