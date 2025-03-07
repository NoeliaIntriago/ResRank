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
    await queryInterface.createTable("bar", {
      id_bar: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_dueno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "id_usuario",
        },
      },
      id_facultad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Facultad",
          key: "id_facultad",
        },
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      horario_inicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      horario_fin: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      tipo_menu: {
        type: Sequelize.ENUM("piqueo", "desayuno", "almuerzo"),
        allowNull: false,
      },
      activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    await queryInterface.dropTable("bar");
  },
};
