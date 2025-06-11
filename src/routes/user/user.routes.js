const { Router } = require("express");
const {
  getUser,
} = require("../../controllers/userController");
const jwtValidate = require("../../middlewares/jwtValidate");


const router = Router();

//GET /me → ver la información del usuario registrado.
router.get("/me", jwtValidate, getUser);

module.exports = router;