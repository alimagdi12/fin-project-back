const express = require("express");
const router = express.Router();


const userRoleRouter = (userRoleController) => {

    router.post('/addRole', async (req, res, next) => {
        try {

            const userRole = await userRoleController.createRole(req.body);
            res.status(201).json(userRole);
        } catch (err) {
            res.status(401).json(userRole)
        }
    });

    return router;
    
}


module.exports = userRoleRouter;