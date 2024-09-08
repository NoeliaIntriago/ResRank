const express = require("express");
const router = express.Router();

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

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.put("/:id_usuario", verifyToken, async (req, res) => {
  const { id_usuario } = req.params;
  const body = req.body;

  try {
    body.usuario_modificacion = req.user.nombre_usuario;
    body.fecha_modificacion = new Date();

    await Usuario.update(body, { where: { id_usuario } });

    res.json({ message: "Usuario actualizado" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
