module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Matches', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        hostTeam: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'host_team'
        },
        guestTeam: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'guest_team'
        },
        time: {
            type: DataTypes.TIME,
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

    // Match.associate = function (models) {
    //     models.Match.belongsTo(models.User, {
    //         onDelete: "CASCADE",
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Match;
};