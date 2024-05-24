'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(3)
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING(3)
      },
      existencia: {
        type: Sequelize.INTEGER
      },
      proForKey: {
        type: Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: 'Categories',
            key: 'id'
          }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};