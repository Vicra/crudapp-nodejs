const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const session = require('express-session');

var productRoutes = require('./routes/productRoutes');
var adminProductsRoutes = require('./routes/adminProductsRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// routes
app.use('/', productRoutes);
app.use('/', adminProductsRoutes);

app.get('*', function(req, res){
    res.render('404',
        {
            title: "Crud App"
        }
    );
});

const port = 3030;
app.listen(port,
    () =>
        console.log(`http://localhost:${port}/`));