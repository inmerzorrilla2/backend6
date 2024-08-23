const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Product;