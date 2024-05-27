const User = require('../../models/user/user.model');
const Product = require('../../models/products/product.model');
const Cart = require('../../models/cart/cart.model');
const jwt = require("jsonwebtoken");

class CartRepository {
    constructor() { }
    

    async getCart(token) {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const cart = await Cart.find({userId}).populate('productId').exec();
        return cart;
    }

    async addToCart(data, token) {
    const { productId, quantity = 1 } = data;  // Set default quantity to 1 if not provided
console.log(data);
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user) throw new Error('User not found');
    if (!product) throw new Error('Product not found');

    // Check if the cart with the same userId and productId already exists
    let cart = await Cart.findOne({ userId, productId });

    if (cart) {
        // If cart exists, increase the quantity by 1
        cart.quantity += 1;
        await cart.save();
    } else {
        // If cart does not exist, create a new cart
        cart = new Cart({ 
            userId: user._id.toString(), 
            productId: product._id.toString(), 
            quantity  // Use the default quantity if not provided
        });
        await cart.save();
    }

    return cart;
}



    async deleteCart(token) {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const userCarts = await Cart.find({ userId });
        if (!userCarts || userCarts.length === 0) throw new Error("user or cart not found");
        
        const deletedCarts = [];
        for (const userCart of userCarts) {
            await userCart.remove();
            deletedCarts.push(userCart);
        }
        
        return deletedCarts;
    }
    


    async removeFromCart(data, token) {
        const { cartId } = data;
        const cart = await Cart.findById(cartId);
        await cart.remove();
        return cart;
    }


    async increaseCartQuantity(data, token) {
        const { productId, quantity } = data; 
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const cart = await Cart.findOne({ userId, productId });
        if (!cart) throw new Error("Cart item not found");

        cart.increaseQuantity(quantity);

        return cart;
    }

    async decreaseCartQuantity(data, token) {
        const { productId, quantity = 1 } = data; // Set default decrease quantity to 1 if not provided
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        
        // Find the cart item with the given userId and productId
        const cart = await Cart.findOne({ userId, productId });
        if (!cart) throw new Error("Cart item not found");
        
        // Check if the cart quantity is 1 or less, remove the cart item
        if (cart.quantity <= 1) {
            await cart.remove();
            return { message: 'Cart item removed', cart };
        }

        // Decrease the quantity and save the cart item
        cart.decreaseQuantity(quantity);

        return cart;
    }


}

module.exports = CartRepository;
