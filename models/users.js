module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
    }, {
        timestamps: true,
        underscored: false,
        tableName: 'User'
    })

    User.associate = async (models) => {
        await User.hasOne(models.Login, { foreignKey: { name: 'userId', allowNull: false }, sourceKey: 'id', onDelete: 'CASCADE' });
        await User.hasMany(models.Board, { foreignKey: { name: 'userId', allowNull: false }, sourceKey: 'id', onDelete: 'CASCADE' });
    }
    return User
}