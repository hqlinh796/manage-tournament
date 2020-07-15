const MatchModel = require('./match.model');

module.exports = (sequelize, DataTypes) => {
    const Arbitration = sequelize.define('arbitrations', {
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
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nationality: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('Male, Female'),
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
    });

    Arbitration.associate = function (models) {
        Arbitration.belongsToMany(models.matches, {
            foreignKey: 'arbitration_id',
            otherKey: 'match_id',
            through: 'matches_arbitrations',
            as: 'arbitration_matches',
            onDelete: "CASCADE",
            onUpdate: 'CASCADE'
        });
    };

    return Arbitration;
};