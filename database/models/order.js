'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    
    static associate(models) {
      //crear las asociaciones 
      // models.Order.hasMany(models.Product, {
      //   as: 'orderPro',
      //   foreignKey: 'ordForKey'
      // });
    }
  }
  Order.init({
    fecha: DataTypes.STRING,
    lugar_de_entrega: DataTypes.STRING,
    listado_de_productos: DataTypes.STRING,
    nombre_del_cliente: DataTypes.STRING,
    nombre_del_encargado: DataTypes.STRING,
    ordForKey:  DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};