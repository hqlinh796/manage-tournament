module.exports = (sequelize, DataTypes) => {
    const Action = sequelize.define('actions', {
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

    Action.associate = function (models) {
        Action.belongsToMany(models.roles, {
            foreignKey: 'action_code',
            sourceKey: 'code',
            otherKey: 'role_code',
            through: 'roles_actions',
            as: 'roles',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    };

    return Action;
};