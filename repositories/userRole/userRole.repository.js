const UserRole = require('../../models/userRole/userRole.model');

class UserRoleRepository {
    constructor() { };


    async createRole(role) {
        const newRole = new UserRole({ role });
        await newRole.save();
        return newRole;
    };
}


module.exports = UserRoleRepository;