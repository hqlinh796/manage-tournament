module.exports = (sequelize, DataTypes) => {
    const MatchCard = sequelize.define('matches_cards', {
        matchId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        cardType: {
            type: DataTypes.ENUM('Yellow, Red'),
            allowNull: false,
            field: 'card_type'
        },
        athleteId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'athlete_id'
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

    // MatchCard.associate = function (models) {
    //     models.MatchCard.belongsTo(models.User, {
    //         onDelete: "CASCADE",
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return MatchCard;
};