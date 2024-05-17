class UserRoleController {
    constructor(userRoleRepository) {
        this.userRoleRepository = userRoleRepository
    };

    async createRole(body) {
        try {
            const newRole = await this.userRoleRepository.createRole(body);
            return { message: 'Role created successfully', role: newRole };
        } catch (error) {
            console.error(error);
            return { message: 'Failed to create role', error: error.message };
        }
    }
}

module.exports = UserRoleController;