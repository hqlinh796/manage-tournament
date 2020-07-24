module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('roles', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
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

    Role.associate = function (models) {
        Role.belongsToMany(models.actions, {
            foreignKey: 'role_code',
            sourceKey: 'code',
            otherKey: 'action_code',
            through: 'roles_actions',
            as: 'actions',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
        Role.hasMany(models.accounts, {
            foreignKey: 'roleCode',
            sourceKey: 'code',
            as: 'role_account',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        })
    };

    return Role;
};