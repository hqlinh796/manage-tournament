module.exports = (sequelize, DataTypes) => {
    const Coach = sequelize.define('coaches', {
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
        salary: {
            type: DataTypes.INTEGER,
            allowNull: true
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

    Coach.associate = (models) => {
        Coach.hasOne(models.teams, {
            sourceKey: 'id',
            foreignKey: 'coachId',
            as: 'coach_team',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    return Coach;
};