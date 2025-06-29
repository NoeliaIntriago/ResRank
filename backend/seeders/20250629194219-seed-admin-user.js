"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Usuarios",
      [
        {
          nombre: "Admin",
          nombre_usuario: "admin",
          correo: "admin@gmail.com",
          contrasena: bcrypt.hashSync("1234", 10),
          rol: "admin",
          celular: "1234567890",
          activo: true,
          usuario_creacion: "system",
          fecha_creacion: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usuarios", {
      nombre_usuario: "admin",
    });
  },
};
