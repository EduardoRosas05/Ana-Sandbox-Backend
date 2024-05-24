'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    
    static associate(models) {
      //crear las asociaciones 
      // models.Category.hasMany(models.Product, {
      //   as: 'categoryPro',
      //   foreignKey: 'proForKey'
      // });
    }
  }
  Category.init({
    nombre: DataTypes.STRING,
    codigo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};