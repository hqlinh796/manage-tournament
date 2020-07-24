module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('matches', {
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
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }, {
        tableName: 'matches'
    });

    Match.associate = function (models) {
        Match.belongsToMany(models.athletes, {
            through: 'matches_athletes',
            foreignKey: 'match_id',
            otherKey: 'athlete_id',
            as: 'match_athletes',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Match.belongsToMany(models.athletes, {
            through: 'matches_scores',
            foreignKey: 'match_id',
            otherKey: 'athlete_id',
            as: 'match_scores',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Match.belongsTo(models.teams, {
            foreignKey: 'hostTeam',
            targetKey: 'id',
            as: 'match_hostTeam',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Match.belongsTo(models.teams, {
            foreignKey: 'guestTeam',
            targetKey: 'id',
            as: 'match_guestTeam',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Match.belongsTo(models.stadiums, {
            targetKey: 'hostTeam',
            foreignKey: 'hostTeam',
            as: 'match_stadium',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
    };

    return Match;
};