'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Actors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: "Movies", // name of Target model
        key: "id", // key in Target model that we're referencing
        },
    },
      name: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      is_admin: {
        type: Sequelize.BOOLEAN
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Actors');
  }
};