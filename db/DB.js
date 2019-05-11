let DB = module.exports = {}

DB.Products = [
  {
    id: 1,
    description: 'blue book',
    price: 10.00
  },
  {
    id: 2,
    description: 'red book',
    price: 15.00
  },
  {
    id: 3,
    description: 'black book',
    price: 8.00
  }
]

DB.Line_Items = [
  {
    id: 1,
    product_id: 1,
    cart_id: 1,
    quantity: 2
  },
  {
    id: 2,
    product_id: 2,
    cart_id: 1,
    quantity: 1    
  },
  {
    id: 3,
    product_id: 3,
    cart_id: 1,
    quantity: 3
  }
]

DB.Carts = [
  {id: 1}
]

DB.Orders = [
  
]