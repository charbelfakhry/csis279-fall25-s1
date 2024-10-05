const { DataTypes } = require("sequelize");
const sequelize = require("../Conifg/DBConfig");

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    user_username: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },

    user_pass: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    user_email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },

    user_phone: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true,
    },

    joined_on: {
        type: DataTypes.DATE,
        allowNull: true,
    },

}, {
    tableName: "users",
    timestamps: false,
});

User.associate = (models) => {
    User.hasMany(models.Order, {
        foreignKey: 'user_id',
        as: 'orders',
    });

    User.hasMany(models.Review, {
        foreignKey: 'user_id',
        as: 'reviews',
    });
};
module.exports = User;
