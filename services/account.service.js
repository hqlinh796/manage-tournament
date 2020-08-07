const database = require('../models');

class AccountService {
    static async getAllAccounts() {
        try {
            return await database.accounts.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addAccount(newAccount) {
        try {
            return await database.accounts.create(newAccount);
        } catch (error) {
            throw error;
        }
    }

    static async updateAccount(id, accountUpdate) {
        try {
            const accountToUpdate = await database.accounts.findOne({
                where: {
                    id: id
                }
            });

            if (accountToUpdate) {
                await database.accounts.update(accountUpdate, {
                    where: {
                        id: id
                    }
                });
                return accountUpdate;
            }
            
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAccount(id) {
        try {
            const account = await database.accounts.findOne({
                where: {
                    id: id
                }
            });

            return account;
        } catch (error) {
            throw error;
        }
    }

    static async deleteAccount(id) {
        try {
            const accountToDelete = await database.accounts.findOne({
                where: {
                    id: id
                }
            });

            if (accountToDelete) {
                const deleteAccount = await database.accounts.destroy({
                    where: {
                        id: id
                    }
                });
                return deleteAccount;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AccountService;