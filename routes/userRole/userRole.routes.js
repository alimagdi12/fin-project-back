const express = require("express");
const router = express.Router();


const userRoleRouter = (userRoleController) => {

    router.post('/addRole', async (req, res, next) => {
        try {

            await userRoleController.createRole(req, res, next);

        } catch (err) {
            next(err)
        }
    });

    return router;
    
}


module.exports = userRoleRouter;