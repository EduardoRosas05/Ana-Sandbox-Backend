'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(3)
      },
      fecha: {
        type: Sequelize.STRING
      },
      lugar_de_entrega: {
        type: Sequelize.STRING
      },
      listado_de_productos: {
        type: Sequelize.STRING
      },
      nombre_del_cliente: {
        type: Sequelize.STRING
      },
      nombre_del_encargado: {
        type: Sequelize.STRING
      },
      ordForKey: {
        type: Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: 'Products',
            key: 'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};