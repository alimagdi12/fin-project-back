


class AuthController {
    constructor(authRepositry) {
        this.authRepositry = authRepositry;
    }

    // Function to handle user signup
    async postSignup(body, files) {
        try {
            console.log(body);
            const result = await this.authRepositry.signup(body);  // Call repository to signup user

            const user = await this.authRepositry.findUserByEmailAndAddImage(body.email, files);  // Add image to user profile

            console.log("user added successfully");
            
            return { msg: "user added successfully", user};  // Return success message and user data

        } catch (err) {
            console.error(err);
            return{ msg: 'failed to create user', error: err.message };  // Return error message if signup fails
        }
    }

    // Function to handle user login
    async postLogin(body) {
        try {
            const email = body.email;
            const password = body.password;
            const token = await this.authRepositry.login(email, password);  // Call repository to login user
            return { token, msg:"user logged in successfully"};  // Return token and success message

        } catch (err) {
            console.error(err);
            return { msg:"user failed to login "};  // Return error message if login fails
        }
    }   
}

module.exports = AuthController;  // Export AuthController class
