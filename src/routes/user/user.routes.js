const { Router } = require("express");
const {
  getUser,
} = require("../../controllers/userController");

const jwtValidate = require("../../middlewares/jwtValidate");

const router = Router();

//GET /me → ver la información del usuario registrado.
//● El usuario puede obtener la información de su perfil, exceptuando la contraseña.
router.get("/me", jwtValidate, getUser);

module.exports = router;