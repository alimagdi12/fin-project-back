const express = require('express');
require('dotenv').config();
const connect = require('./db/connection')
const PORT = process.env.PORT;
const app = express();
const requestIp = require('request-ip');


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


// routes of the whole application
const authRoutes = require("./routes/auth/auth.routes");
const productsRoutes = require('./routes/products/products.routes');
const productStatusRoutes = require('./routes/productStatus/productStatus.routes');
const userRoleRoutes = require('./routes/userRole/userRole.routes');
const categoryRoutes = require('./routes/category/category.routes');
const subCategoryRoutes = require('./routes/subCategory/subCategory.routes');
// Middleware to get client's IP address
app.use(requestIp.mw());

app.use(express.json());



// executing the routes 
app.use("/api/v1/auth", authRoutes(authController));
app.use("/api/v1/products", productsRoutes(productController));
app.use('/api/v1', productStatusRoutes(productStatusController));
app.use('/api/v1/admin', [
        userRoleRoutes(userRoleController),
        categoryRoutes(categoryController),
        subCategoryRoutes(subcategoryController)
    ]
);

connect
    .connection
    .then(result => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });
