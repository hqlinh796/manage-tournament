module.exports = (sequelize, DataTypes) => {
    const Athlete = sequelize.define('athletes', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        fullName: {
            type: DataTypes.TEXT,
            allowNull: false,
            filed: 'full_name'
        },
        positionCode: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'position_code'
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
            allowNull: true
        },
        dominantFoot: {
            type: DataTypes.ENUM('Trái', 'Phải'),
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
        Athlete.belongsTo(models.positions, {
            foreignKey: 'positionCode',
            targetKey: 'id',
            as: 'athlete_position',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        })
    };

    return Athlete;
};