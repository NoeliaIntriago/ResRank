"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "facultades",
      [
        {
          nombre: "FIEC",
          color: "#5c859b",
          latitud: -2.144626,
          longitud: -79.967884,
          activo: 1,
        },
        {
          nombre: "FIMCP",
          color: "#005ca6",
          latitud: -2.144599,
          longitud: -79.965894,
          activo: 1,
        },
        {
          nombre: "FCNM",
          color: "#3e297b",
          latitud: -2.146358,
          longitud: -79.967013,
          activo: 1,
        },
        {
          nombre: "FADCOM",
          color: "#bd1e71",
          latitud: -2.14406774,
          longitud: -79.96233242,
          activo: 1,
        },
        {
          nombre: "FICT",
          color: "#394e28",
          latitud: -2.145539,
          longitud: -79.965389,
          activo: 1,
        },
        {
          nombre: "FCV",
          color: "#437d24",
          latitud: -2.152035,
          longitud: -79.957036,
          activo: 1,
        },
        {
          nombre: "FIMCM",
          color: "#0e8791",
          latitud: -2.14664914,
          longitud: -79.96332544,
          activo: 1,
        },
        {
          nombre: "FCSH",
          color: "#ffd400",
          latitud: -2.14753266,
          longitud: -79.96862126,
          activo: 1,
        },
      ],
      {
        updateOnDuplicate: ["nombre", "color", "latitud", "longitud", "activo"],
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("facultades", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
