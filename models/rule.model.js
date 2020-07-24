module.exports = (sequelize, DataTypes) => {
    const Rule = sequelize.define('rules', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        minAge: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'min_age'
        },
        maxAge: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'max_age'
        },
        minAthletes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'min_athletes'
        },
        maxAthletes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'max_athletes'
        },
        maxForeignAthletes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'max_foreign_athletes'
        },
        maxTimeScore: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'max_time_score'
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

    return Rule;
};