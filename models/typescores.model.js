module.exports = (sequelize, DataTypes) => {
    const TypeScore = sequelize.define('typescores', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        point: {
            type: DataTypes.INTEGER,
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

    TypeScore.associate = function (models) {
        TypeScore.hasMany(models.matches_scores, {
            foreignKey: 'typeScore',
            sourceKey: 'code',
            as: 'typescore_matches_scores',
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        });
    };

    return TypeScore;
};