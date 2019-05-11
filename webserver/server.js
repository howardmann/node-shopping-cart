const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()

// Receive html form payload via req.body
app.use(bodyParser())

// Express sessions
app.use(session({
  secret: '42'
}))

// Access sessions in all templates
app.use(function (req, res, next) {
  res.locals.cart = req.session.cart; // This is the important line
  res.locals.order = req.session.order; // This is the important line
  next();
});

// View template engine
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './webserver/views');


// method override to use DELETE in html forms
const methodOverride = require('method-override')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Routes
const routes = require('./routes')
app.use(routes)

const PORT = 3000
app.listen(PORT, function () {
  console.log(`Listening on PORT: ${PORT}`);
})
