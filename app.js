const express = require('express');
require('dotenv').config();
const connect = require('./db/connection')
const PORT = process.env.PORT;
const app = express();
const requestIp = require('request-ip');
const bodyParser = require('body-parser');

const authRoutes = require("./routes/auth/auth.routes");

// Middleware to get client's IP address
app.use(requestIp.mw());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use("/auth", authRoutes);


connect
    .connection
    .then(result => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    })