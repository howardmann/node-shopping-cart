# Node Shopping Cart Example App

Basic implementation of shopping cart model logic using Node Express and in-memory model and DB.

A user should be able to:
- view and add products to a cart
- add and remove product items from the cart
- checkout the cart and add order details

A simple relational database model could be as follows:

![shopping cart DB entity](./img/Shopping_Cart.png)

App setup as follows
```shell
db // database persistence layer
  L DB.js // temp stored in memory
  L mongodb.js // TODO: add mongodb connection

model // CRUD and validation to DB
  L validation // validate data before being written to DB (use JOI helper)
  LineItem.js // CRUD functions
  Product.js // CRUD functions
  Order.js // CRUD functions

controller // API between interface and model. Responsible for serialization and any other logic required that is not specifcally related to direct CRUD operations
  L serializers // serialize data appropriate for model
  products.js // product controller
  carts.js // cart controller (add/ remove LineItems and update qty if product exists) <- most logic here
  orders.js // order controller (update LineItems assoc from cart to order)

webserver // Web interface
  L routes // Express routes (handles sessions whcih are webserver specific) controller has no logic of sessions
  server.js // Express application

util // Shared util helpers
  L wrapper.js // wrap async await functions to fail safely
```
### TODO:
- [x] Architecture
- [x] Model validation with JOI
- [x] Products CRUD
- [x] Line_Items CRUD
- [x] Carts CRUD
- [x] Web interface - Products Index
- [x] Web interface - Cart (add and remove items)
- [x] Web sessions for Cart
- [x] Orders CRUD
- [x] Web interface - Orders checkout

