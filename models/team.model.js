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
        logo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        coachId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'coach_id'
        },
        managerId: {
            type: DataTypes.UUID,
            allowNull: true,
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

    Team.associate = function (models) {
        Team.belongsTo(models.coaches, {
            foreignKey: 'coachId',
            targetKey: 'id',
            as: 'team_coach',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Team.belongsTo(models.managers, {
            foreignKey: 'managerId',
            targetKey: 'id',
            as: 'team_manager',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Team.hasOne(models.stadiums, {
            foreignKey: 'hostTeam',
            sourceKey: 'id',
            as: 'team_stadium',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
        Team.hasMany(models.matches, {
            foreignKey: 'hostTeam',
            sourceKey: 'id',
            as: 'hostTeam_matches',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Team.hasMany(models.matches, {
            foreignKey: 'guestTeam',
            sourceKey: 'id',
            as: 'guestTeam_matches',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
        Team.hasMany(models.athletes, {
            foreignKey: 'teamId',
            sourceKey: 'id',
            as: 'team_athletes',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
    };

    return Team;
};