const { Router } = require("express");
const {
  login,
  register,
} = require("../../controllers/authController");

const router = Router();

//POST /login → Ingreso de un usuario registrado.
//● Ingresar correo electrónico, contraseña.
router.post("/login", login);

//POST /register → Registrar un usuario.
//● Ingresar nombre, apellido, correo electrónico, contraseña.
//● La contraseña debe ser hasheada antes de ingresar a la base de datos.
router.post("/register", register);

module.exports = router;