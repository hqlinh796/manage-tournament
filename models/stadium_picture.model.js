module.exports = (sequelize, DataTypes) => {
    const StadiumPicture = sequelize.define('stadiums_pictures', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        picture: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        stadiumId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'stadium_id'
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

    StadiumPicture.associate = function (models) {
        StadiumPicture.belongsTo(models.stadiums, {
            foreignKey: 'stadiumId',
            targetKey: 'id',
            as: 'stadiumpicture_stadium',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
    };

    return StadiumPicture;
};