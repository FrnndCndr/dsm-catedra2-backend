const { Router } = require("express");
const {
  login,
  register,
} = require("../../controllers/authController");

const router = Router();
//POST /login → Ingreso de un usuario registrado.
router.post("/login", login);
//POST /register → Registrar un usuario.
router.post("/register", register);

module.exports = router;