const { DataTypes } = require("sequelize");
const sequelize = require('../Conifg/DBConfig');

const Order = sequelize.define('orders', {
  order_paymnt_method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order_shipping_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order_total: {
    type: DataTypes.FLOAT,
    allowNull: false

  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
},
  {
    timestamps: true,
    tbalename: 'orders',
    createdAt: 'made_on',
    updatedAt: false
  });

module.exports = Order;