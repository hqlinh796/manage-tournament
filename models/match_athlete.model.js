module.exports = (sequelize, DataTypes) => {
    const MatchAthlete = sequelize.define('matches_athletes', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        matchId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            field: 'match_id'
        },
        athleteId: {
            type: DataTypes.UUID,
            primaryKey: true,
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

    MatchAthlete.associate = function (models) {
        MatchAthlete.belongsTo(models.athletes, {
            foreignKey: 'athleteId',
            targetKey: 'id',
            as: 'matches_athletes_athlete',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        MatchAthlete.hasMany(models.matches_scores, {
            foreignKey: 'matchAthlete',
            sourceKey: 'id',
            as: 'matches_athletes_scores',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
    };

    return MatchAthlete;
};