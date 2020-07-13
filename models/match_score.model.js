module.exports = (sequelize, DataTypes) => {
    const MatchScore = sequelize.define('matches_scores', {
        gameId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'game_id'
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        athleteId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'athlete_id'
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

    // MatchScore.associate = function (models) {
    //     models.MatchScore.belongsTo(models.User, {
    //         onDelete: "CASCADE",
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return MatchScore;
};