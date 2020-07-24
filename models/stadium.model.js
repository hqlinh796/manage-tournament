module.exports = (sequelize, DataTypes) => {
    const Stadium = sequelize.define('stadiums', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        hostTeam: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'host_team',
            unique: true
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

    Stadium.associate = function (models) {
        Stadium.hasMany(models.matches, {
            foreignKey: 'hostTeam',
            sourceKey: 'hostTeam',
            as: 'stadium_matches',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Stadium.hasMany(models.pictures, {
            foreignKey: 'stadiumId',
            sourceKey: 'id',
            as: 'stadium_pictures',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Stadium.belongsTo(models.teams, {
            foreignKey: 'hostTeam',
            targetKey: 'id',
            as: 'stadium_team',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        })
    };

    return Stadium;
};