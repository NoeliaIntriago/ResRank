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
    await queryInterface.createTable("usuario", {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombre_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Opcional si quieres garantizar correos únicos
      },
      contrasena: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      celular: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rol: {
        type: Sequelize.ENUM("estudiante", "dueno_restaurante", "admin"),
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
        allowNull: true,
      },
      fecha_modificacion: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("usuario");
  },
};
