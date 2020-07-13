module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('teams', {
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
        coachId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'coach_id'
        },
        managerId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'manager_id'
        },
        homeShirt: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'home_shirt'
        },
        awayShirt: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'away_shirt'
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

    // Team.associate = function (models) {
    //     models.Team.belongsTo(models.User, {
    //         onDelete: "CASCADE",
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Team;
};