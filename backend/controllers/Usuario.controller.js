// controllers/UsuarioController.js

const bcrypt = require("bcryptjs");
const { Usuario, Estudiante } = require("../models");

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Estudiante, as: "estudiante" }],
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error retrieving users", error });
  }
};

exports.createUsuario = async (req, res) => {
  const body = req.body;

  try {
    const { usuario_creacion } = req.headers;

    const usuario = await Usuario.create({
      ...body,
      usuario_creacion,
      fecha_creacion: new Date(),
    });

    if (body.rol === "estudiante") {
      await Estudiante.create({
        id_usuario: usuario.id_usuario,
        matricula: body.matricula,
      });
    }

    res.status(201).json({ usuario, message: "Usuario creado" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al crear el usuario", error });
  }
};

exports.updateUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const body = req.body;

  try {
    // Validar que no se esté desactivando a sí mismo
    if (Number(id_usuario) === Number(req.user.id_usuario) && !body.activo) {
      return res.status(400).json({
        message: "No puedes desactivar tu propia cuenta",
      });
    }

    if (body.contrasena) {
      body.contrasena = await bcrypt.hash(body.contrasena, 8);
    }
    body.usuario_modificacion = req.headers.usuario_modificacion;
    body.fecha_modificacion = new Date();

    await Usuario.update(body, { where: { id_usuario } });

    if (body.rol === "estudiante") {
      await Estudiante.update(
        { matricula: body.matricula },
        { where: { id_usuario } }
      );
    }

    res.json({ message: "Usuario actualizado" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al actualizar el usuario", error });
  }
};
