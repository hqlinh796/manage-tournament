module.exports = (sequelize, DataTypes) => {
    const Position = sequelize.define('positions', {
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

    Position.associate = function (models) {
        Position.hasMany(models.athletes, {
            foreignKey: 'positionCode',
            sourceKey: 'code',
            as: 'position_athletes',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    };

    return Position;
};