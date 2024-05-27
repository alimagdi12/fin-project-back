const express = require('express');
const http = require('http');
require('dotenv').config();
const connect = require('./db/connection')
const PORT = process.env.PORT;
const app = express();
const requestIp = require('request-ip');
const socket = require('socket.io');
const cors = require('cors');

const server = http.createServer(app);


const jwt = require('jsonwebtoken');

const getUserIdFromToken = (socket) => {
    return new Promise((resolve, reject) => {
        // Extract the token from the headers
        const token = socket.handshake.headers['jwt'];
        
        // Check if the token is provided
        if (!token) {
            return reject(new Error('No token provided'));
        }

        // Verify the token using a secret key
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(new Error('Failed to authenticate token'));
            }

            // Resolve with the userId if token is valid
            resolve(decoded.userId);
        });
    });
};
const io = socket(server,{
  cors: {
    origin: "*", // Allow all origins (adjust as needed)
    methods: ["GET", "POST"]
  }
});

io.on('connection', async (socket) => {
    console.log('a connection started', socket.id);
    
    // Assume you have a way to get the userId, e.g., from a token
    // const userId = await getUserIdFromToken(socket);
    const userId = '664778157312fd64b4f49dd1';
    if (userId) {
        await userController.handleSocketConnection(userId, socket.id);
    }

    socket.on('disconnect', async () => {
        console.log('a connection disconnected', socket.id);
        await userController.handleSocketDisconnection(socket.id);
    });
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST','PUT']
}));

// calling AuthRespositry and AuthController
const AuthRespositry = require('./repositories/auth/auth.repositry');
const AuthController = require('./controllers/auth/auth.controller');
// calling ProductRepositry and ProductController
const ProductRepositry = require('./repositories/products/products.repositry');
const ProductController = require('./controllers/products/products.controller');
// calling ProductStatusRepositry and ProductStatusController
const ProductStatusRepositry = require('./repositories/productStatus/productStatus.repositry');
const ProductStatusController = require('./controllers/productStatus/productStatus.controller');
// calling userRoleRepository and UserRoleController
const UserRoleRepository = require('./repositories/userRole/userRole.repository');
const UserRoleController = require('./controllers/userRole/userRole.controller');
// calling CategoryRepository and CategoryController
const CategoryRepository = require('./repositories/category/category.repositry');
const CategoryController = require('./controllers/category/category.controller');
// calling categoryRepository and CategoryController
const SubcategoryRepository = require('./repositories/subcategory/subCategory.repository');
const SubcategoryController = require('./controllers/subCategory/subCategory.controller');
// calling UserRepository and UserController
const UserRepository = require('./repositories/user/user.repository');
const UserController = require('./controllers/user/user.controller');
// calling AuctionRepository and AuctionController
const AuctionRepository = require('./repositories/auction/auction.repository');
const AuctionController = require('./controllers/auction/auction.controller');
// calling BidRepository and BidController
const BidRepository = require('./repositories/bid/bid.repository');
const BidController = require('./controllers/bid/bid.controllers');
// calling CartRepository and CartController
const CartRepository = require('./repositories/cart/cart.repository');
const CartController = require('./controllers/cart/cart.controllers');








// Create instances of AuthRepository and AuthController
const authRepositry = new AuthRespositry();
const authController = new AuthController(authRepositry);
// Create instances of ProductRepositry and ProductController
const productRespositry = new ProductRepositry();
const productController = new ProductController(productRespositry);
// Create instances of ProductStatusRepositry and ProductStatusController
const productStatusRespositry = new ProductStatusRepositry();
const productStatusController = new ProductStatusController(productStatusRespositry);
// Create instances of userRoleRepository and userRoleController
const userRoleRepository = new UserRoleRepository();
const userRoleController = new UserRoleController(userRoleRepository);
// Create instances of userRoleRepository and userRoleController
const categoryRepository = new CategoryRepository();
const categoryController = new CategoryController(categoryRepository);
// Create instances of subCategoryRepository and subCategoryController
const subcategoryRepository = new SubcategoryRepository();
const subcategoryController = new SubcategoryController(subcategoryRepository);
// Create instances of userRepository and userController
const userRepository = new UserRepository(io);
const userController = new UserController(userRepository);
// Create instances of AuctionRepository and AuctionController
const auctionRepository = new AuctionRepository();
const auctionController = new AuctionController(auctionRepository);
// Create instances of BidRepository and BidController
const bidRepository = new BidRepository(io);
const bidController = new BidController(bidRepository);
// Create instances of CartRepository and CartController
const cartRepository = new CartRepository();
const cartController = new CartController(cartRepository);





// routes of the whole application
const authRoutes = require("./routes/auth/auth.routes");
const productsRoutes = require('./routes/products/products.routes');
const productStatusRoutes = require('./routes/productStatus/productStatus.routes');
const userRoleRoutes = require('./routes/userRole/userRole.routes');
const categoryRoutes = require('./routes/category/category.routes');
const subCategoryRoutes = require('./routes/subCategory/subCategory.routes');
const userRoutes = require('./routes/user/user.routes');
const auctionRoutes = require('./routes/auction/aucttion.routes');
const bidRoutes = require('./routes/bid/bid.routes');
const cartRoutes = require('./routes/cart/cart.routes');


// Middleware to get client's IP address
app.use(requestIp.mw());
app.use(express.json());

// executing the routes 
app.use("/api/v1/auth", [authRoutes(authController), userRoutes(userController),bidRoutes(bidController),cartRoutes(cartController)]);
app.use("/api/v1/products", productsRoutes(productController));
app.use('/api/v1', [productStatusRoutes(productStatusController), auctionRoutes(auctionController)]);
app.use('/api/v1/admin', [
    userRoleRoutes(userRoleController),
    categoryRoutes(categoryController),
    subCategoryRoutes(subcategoryController)
]);

connect.connection
    .then(result => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
