module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define("Board", {
        title: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        writer: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
    }, {
        timestamps: true,
        underscored: false,
        tableName: 'Board'
    })
    return Board
}