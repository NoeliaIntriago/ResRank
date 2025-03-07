"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("opinion_restaurante", {
      id_opinion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "id_usuario",
        },
      },
      id_bar: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Bar",
          key: "id_bar",
        },
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      calificacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      usuario_creacion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      usuario_modificacion: {
        type: Sequelize.STRING,
      },
      fecha_modificacion: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("opinion_restaurante");
  },
};
