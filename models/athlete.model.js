module.exports = (sequelize, DataTypes) => {
    const Athlete = sequelize.define('athlete', {
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
            allowNull: false
        },
        teamId: {
            type: DataTypes.UUID,
            allowNull: true
        }
    });

    Athlete.associate = function (models) {
        models.Athlete.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Athlete;
};