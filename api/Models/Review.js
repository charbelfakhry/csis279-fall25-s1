
const { DataTypes } = require('sequelize');
const sequelize = require('../Conifg/DBConfig');

const Review = sequelize.define('Review', {
  review_id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  review_body: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  tableName: 'reviews',
  timestamps: false
});


module.exports = Review;