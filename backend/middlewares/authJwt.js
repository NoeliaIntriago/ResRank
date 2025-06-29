const jwt = require("jsonwebtoken");
const CODE = require("../controllers/utils/response/codes");
const { errorResponse } = require("../controllers/utils/response");

function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return errorResponse(res, CODE.AUTH.NO_TOKEN_PROVIDED, null, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, CODE.AUTH.TOKEN_INVALID, null, 401);
  }
}

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
