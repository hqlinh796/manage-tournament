module.exports = (sequelize, DataTypes) => {
    const Athlete = sequelize.define('athletes', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        fullName: {
            type: DataTypes.TEXT,
            allowNull: false,
            filed: 'full_name'
        },
        position: {
            type: DataTypes.ENUM('ST', 'CM', 'CB', 'GK'),
            allowNull: false
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nationality: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dominantFoot: {
            type: DataTypes.ENUM('Left', 'Right'),
            allowNull: false,
            field: 'dominant_foot'
        },
        teamId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'team_id'
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

    Athlete.associate = function (models) {
        Athlete.belongsTo(models.teams, {
            foreignKey: {
                name: 'teamId',
                allowNull: true
            },
            targetKey: 'id',
            as: 'athlete_team',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
        Athlete.belongsToMany(models.matches, {
            foreignKey: 'athlete_id',
            otherKey: 'match_id',
            through: 'athletes_matches',
            as: 'athlete_matches',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
        Athlete.belongsToMany(models.matches, {
            foreignKey: 'athlete_id',
            otherKey: 'match_id',
            through: 'athletes_scores',
            as: 'athlete_socres',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
        Athlete.belongsToMany(models.matches, {
            foreignKey: 'athlete_id',
            otherKey: 'match_id',
            through: 'matches_cards',
            as: 'athlete_cards',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        })
    };

    return Athlete;
};