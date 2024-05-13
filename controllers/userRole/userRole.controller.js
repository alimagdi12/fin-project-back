class UserRoleController {
    constructor(userRoleRepository) {
        this.userRoleRepository = userRoleRepository
    };

    async createRole(req, res, next) {
        try {
            const { role } = req.body;
            const newRole = await this.userRoleRepository.createRole(role);
            res.status(201).json({ message: 'Role created successfully', role: newRole });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create role', error: error.message });
        }
    }
}

module.exports = UserRoleController;