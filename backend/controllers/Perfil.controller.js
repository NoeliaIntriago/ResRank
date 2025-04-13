// controllers/Perfil.controller.js

const bcrypt = require("bcryptjs");
const { Usuario, Estudiante } = require("../models");
const logger = require("../services/logger");

exports.updateProfile = async (req, res) => {
  const params = req.params;
  const body = req.body;

  const { usuario_modificacion } = req.headers;
  try {
    const usuario = await Usuario.findByPk(params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { nombre, nombre_usuario, correo, celular } = body;
    const updatedData = {
      nombre,
      nombre_usuario,
      correo,
      celular,
      usuario_modificacion,
    };

    if (usuario.rol === "ESTUDIANTE") {
      const { matricula } = body;
      await Estudiante.update(
        { matricula },
        { where: { id_usuario: params.id } }
      );
    }

    await Usuario.update(updatedData, { where: { id_usuario: params.id } });
    res.json({ message: "Perfil actualizado" });
  } catch (error) {
    console.error(error);
    logger.error(error);
    res.status(400).json({ message: "Error al actualizar perfil", error });
  }
};

exports.updatePassword = async (req, res) => {
  const params = req.params;
  const { contrasena_actual, contrasena_nueva } = req.body;

  const { usuario_modificacion } = req.headers;

  try {
    const usuario = await Usuario.findByPk(params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(contrasena_actual, usuario.contrasena);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }
    const hashedPassword = await bcrypt.hash(contrasena_nueva, 8);
    await Usuario.update(
      { contrasena: hashedPassword, usuario_modificacion },
      { where: { id_usuario: params.id } }
    );
    res.json({ message: "Contraseña actualizada" });
  } catch (error) {
    console.error(error);
    logger.error(error);
    res
      .status(400)
      .json({ message: "Error al actualizar la contraseña", error });
  }
};
