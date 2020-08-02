module.exports = (sequelize, DataTypes) => {
    const MatchScore = sequelize.define('matches_scores', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        matchAthlete: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'match_athlete'
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        typeScore: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'type_score'
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

    MatchScore.associate = function (models) {
        MatchScore.belongsTo(models.typescores, {
            foreignKey: 'typeScore',
            targetKey: 'code',
            as: 'matches_scores_typescore',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        MatchScore.belongsTo(models.matches_athletes, {
            foreignKey: 'matchAthlete',
            targetKey: 'id',
            as: 'matches_scores_athlete',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
    };

    return MatchScore;
};