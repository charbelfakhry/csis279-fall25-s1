const { DataTypes } = require('sequelize');
const sequelize = require('../Conifg/DBConfig');

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categories',
    timestamps: true,
    createdAt : false,
    updatedAt : false
});

Category.associate = (models) => {
    Category.hasMany(models.Product, {
        foreignKey: 'category_id',
        as: 'products',
    });
};

module.exports = Category;
