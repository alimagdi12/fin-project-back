class CartController {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }

    async getCart(token) {
        try { 
            const cart = await this.cartRepository.getCart(token);
            return {message:'user cart fetched successfully',cart}
        } catch (err) {
            console.error(err);
            return {message:err.message}
        }
    }


    async addToCart(body, token) {
        try {
            const cart = await this.cartRepository.addToCart(body, token);
            return { message: 'cart added successfully', cart };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async deleteCart(token) {
        try { 
            const cart = await this.cartRepository.deleteCart(token);
            return {message:'cart deleted successfully',cart}
        }
        catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async removeFromCart(body, token) {
        try {
            const cart = await this.cartRepository.removeFromCart(body, token);
            return { message: 'cart removed from cart successfully', cart };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
    }

    async increaseCartQuantity(body, token) {
        try {
            const cart = await this.cartRepository.increaseCartQuantity(body, token);
            return { message: 'cart quantity increased successfully', cart };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
        
    }

    async decreaseCartQuantity(body, token) {
        try {
            const cart = await this.cartRepository.decreaseCartQuantity(body, token);
            return { message: 'cart quantity decreased successfully', cart };
        } catch (err) {
            console.error(err);
            return { message: err.message };
        }
        
    }
}




module.exports = CartController;
