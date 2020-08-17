const database = require('../models');

class ManagerService {
    static async getAllManagers() {
        try {
            return await database.managers.findAll({include: [
                {
                    model: database.accounts,
                    as: 'manager_account'
                }
            ]});
        } catch (error) {
            throw error;
        }
    }

    static async addManager(newManager) {
        try {
            return await database.managers.create(newManager);
        } catch (error) {
            throw error;
        }
    }

    static async updateManager(id, updateManager) {
        try {
            const managerToUpdate = await database.managers.findOne({
                where: {
                    id: id
                }
            });

            if (managerToUpdate) {
                await database.managers.update(updateManager, {
                    where: {
                        id: id
                    }
                });
                return managerToUpdate;
            }
            
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getManager(id) {
        try {
            const manager = await database.managers.findOne({
                where: {
                    id: id
                }
            });

            return manager;
        } catch (error) {
            throw error;
        }
    }

    static async getManagerByAccount(accountId) {
        try {
            const manager = await database.managers.findOne({
                where: {
                    accountId: accountId
                }
            });

            return manager;
        } catch (error) {
            throw error;
        }
    }

    static async deleteManager(id) {
        try {
            const managerToDelete = await database.managers.findOne({
                where: {
                    id: id
                }
            });

            if (managerToDelete) {
                const deleteManager = await database.managers.destroy({
                    where: {
                        id: id
                    }
                });
                return managerToDelete;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ManagerService;