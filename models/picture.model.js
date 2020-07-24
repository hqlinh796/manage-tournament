module.exports = (sequelize, DataTypes) => {
    const Picture = sequelize.define('pictures', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        stadiumId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'stadium_id'
        },
        picture: {
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

    Picture.associate = function (models) {
        Picture.belongsTo(models.stadiums, {
            foreignKey: 'stadiumId',
            targetKey: 'id',
            as: 'pictures_stadium',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    };

    return Picture;
};