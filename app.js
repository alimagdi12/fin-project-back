const express = require('express');
require('dotenv').config();
const connect = require('./db/connection')
const PORT = process.env.PORT;
const app = express();
const requestIp = require('request-ip');
const bodyParser = require('body-parser');


// calling AuthRespositry and AuthController
const AuthRespositry = require('./repositories/auth/auth.repositry');
const AuthController = require('./controllers/auth/auth.controller');
// calling ProductRepositry and ProductController
const ProductRepositry = require('./repositories/products/products.repositry');
const ProductController = require('./controllers/products/products.controller');


// Create instances of AuthRepository and AuthController
const authRepositry = new AuthRespositry();
const authController = new AuthController(authRepositry);
// Create instances of ProdictRepositry and ProductController
const productRespositry = new ProductRepositry();
const productController = new ProductController(productRespositry);


// routes of the whole application
const authRoutes = require("./routes/auth/auth.routes");
const productsRoutes = require('./routes/products/products.routes');

// Middleware to get client's IP address
app.use(requestIp.mw());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());



// executing the routes 
app.use("/auth", authRoutes(authController));
app.use("/products", productsRoutes(productController));


connect
    .connection
    .then(result => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });
