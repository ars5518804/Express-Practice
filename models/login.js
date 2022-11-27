module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("Login", {
        os: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        device: {
            type: DataTypes.STRING(10),
            allowNull: true
        }
    }, {
        timestamps: true,
        underscored: false,
        tableName: 'Login'
    })
    return Login
}