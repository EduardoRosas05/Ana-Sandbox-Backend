'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      //crear las asociaciones 
      // models.Product.hasOne(models.Category, {
      //   as: 'productCat',
      //   foreignKey: 'proForKey'
      // });

      // models.Product.BelongsToMany(models.Order, {
      //   as: 'productOrd',
      //   foreignKey: 'ordForKey'
      // });
    
    }
  }
  Product.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    codigo: DataTypes.STRING,
    existencia: DataTypes.INTEGER,
    proForKey: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};