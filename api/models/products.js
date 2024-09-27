import { DataTypes } from "sequelize";
import sequelize from "../config/configSqlz";

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    product_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    product_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'category_id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: "products",
    timestamps: true,
});

export default Product;
