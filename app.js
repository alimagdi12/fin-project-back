const express = require('express');
require('dotenv').config();
const connect = require('./db/connection')
const PORT = process.env.PORT;
const app = express();
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const AuthRespositry = require('./repositories/auth/auth.repositry')
const AuthController = require('./controllers/auth/auth.controller');
// routes of the whole application
const authRoutes = require("./routes/auth/auth.routes");
const productsRoutes = require('./routes/products/products.routes');

// Middleware to get client's IP address
app.use(requestIp.mw());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

// Create instances of AuthRepository and AuthController
const authRepositry = new AuthRespositry();
const authController = new AuthController(authRepositry);

// executing the routes 
app.use("/auth", authRoutes(authController));
app.use("/products", productsRoutes);


connect
    .connection
    .then(result => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });
