const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');

var productRoutes = require('./routes/productRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// routes
app.use('/product', productRoutes);

const port = 3030;
app.listen(port,
    () =>
        console.log(`http://localhost:${port}/product`));