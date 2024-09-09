const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { Usuario, Estudiante } = require("../models");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Estudiante, as: "estudiante" }],
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;

  try {
    const usuario = await Usuario.create(body);

    if (body.rol === "estudiante") {
      await Estudiante.create({
        id_usuario: usuario.id_usuario,
        matricula: body.matricula,
      });
    }

    res.json(usuario, { message: "Usuario creado" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error, { message: "Error al crear el usuario" });
  }
});

router.put("/:id_usuario", verifyToken, async (req, res) => {
  const { id_usuario } = req.params;
  const body = req.body;

  try {
    // Validar que no se esté desactivando a sí mismo
    if (Number(id_usuario) === Number(req.user.id_usuario) && !body.activo) {
      return res.status(400).json({
        message: "No puedes desactivar tu propia cuenta",
      });
    }

    if (body.contrasena)
      body.contrasena = await bcrypt.hash(body.contrasena, 8);
    body.usuario_modificacion = req.user.nombre_usuario;
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
    res.status(400).json(error, { message: "Error al actualizar el usuario" });
  }
});

module.exports = router;
