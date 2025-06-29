// controllers/Facultad.controller.js

const { Facultad, Bar } = require("../models");
const logger = require("../services/logger");
const { errorResponse, successResponse } = require("./utils/response");
const CODE = require("./utils/response/codes");

exports.getAllFacultades = async (req, res) => {
  try {
    const params = req.query;
    const facultades = await Facultad.findAll({
      order: [["nombre", "ASC"]],
      include: params.append_restaurants
        ? [
            {
              model: Bar,
              as: "restaurants",
            },
          ]
        : [],
    });

    res.json(facultades);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.SERVER.UNKNOWN, error, 500);
  }
};

exports.createFacultad = async (req, res) => {
  const body = req.body;

  try {
    const facultad = await Facultad.create(body);
    return successResponse(res, CODE.FACULTAD.CREATE_SUCCESS, facultad, 201);
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.FACULTAD.CREATE_FAILED, error, 500);
  }
};

exports.updateFacultad = async (req, res) => {
  const { id_facultad } = req.params;
  const body = req.body;

  try {
    const [updatedRows] = await Facultad.update(body, {
      where: { id_facultad },
    });

    if (updatedRows === 0) {
      return errorResponse(res, CODE.FACULTAD.NOT_FOUND, null, 404);
    }

    return successResponse(
      res,
      CODE.FACULTAD.UPDATE_SUCCESS,
      { id_facultad, ...body },
      200
    );
  } catch (error) {
    logger.error(error);
    return errorResponse(res, CODE.FACULTAD.UPDATE_FAILED, error, 500);
  }
};
