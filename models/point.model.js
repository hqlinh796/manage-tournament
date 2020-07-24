module.exports = (sequelize, DataTypes) => {
    const Point = sequelize.define('points', {
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
        point: {
            type: DataTypes.INTEGER,
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

    return Point;
};