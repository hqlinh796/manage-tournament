module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('accounts', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        roleCode: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'role_code'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    });

    Account.associate = function (models) {
        Account.hasOne(models.managers, {
            foreignKey: {
                name: 'accountId',
                allowNull: true
            },
            sourceKey: 'id',
            as: 'account_manager',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
        Account.hasOne(models.teams, {
            foreignKey: {
                name: 'managerId',
                allowNull: true
            },
            sourceKey: 'id',
            as: 'account_team',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
        Account.belongsTo(models.roles, {
            foreignKey: 'roleCode',
            targetKey: 'code',
            as: 'account_role',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    };

    return Account;
};