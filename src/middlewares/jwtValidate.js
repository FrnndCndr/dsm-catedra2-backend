const jwt = require("jsonwebtoken");

const jwtValidate = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: true,
        msg: "Token de autenticación no proporcionado",
      });
    }

    const { idUser, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { idUser, role };

    next();
  } catch (error) {
    console.error("Error al validar token:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: true,
        msg: "El token ha expirado",
      });
    }
    return res.status(401).json({
      error: true,
      msg: "Token inválido",
    });
  }
};

module.exports = jwtValidate;