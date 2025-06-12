const { Router } = require("express");
const {
    createLoan,
    getAllLoan,
    getLoanByUserId,
    returnBook,
} = require("../../controllers/loanController");

const jwtValidate = require("../../middlewares/jwtValidate");
const accessRole = require("../../middlewares/accessRole");

const router = Router();
router.use(jwtValidate);

//POST /loan → registrar nuevo préstamo
//● El usuario registrado puede prestar los libros a los usuarios registrados en el sistema.
//● Automáticamente se debe crear una fecha de préstamo en el día presente y su devolución debe ser una semana después de crearse.
//● El estado del préstamo debe ser automáticamente prestado.
router.post("/loan", accessRole(1), createLoan);

//GET /loans → listar todos los libros prestados
//● El usuario registrado puede visualizar los libros prestados.
router.get("/loans", accessRole(1, 2), getAllLoan);
//GET /loans/users/:usuario_id → ver préstamos por usuario
//● El usuario registrado puede visualizar los libros prestados por usuario.
router.get("/loans/users/:usuario_id", accessRole(1, 2), getLoanByUserId);

//PUT /loan/return/:id/ → marcar como devuelto
//● El usuario registrado puede generar la devolución de un libro prestado.
//● Se debe cambiar el estado del préstamo a devuelto. En caso de que la devolución sea tardía, se debe cambiar el estado a “con retraso”.
router.put("/loan/return/:id", accessRole(1, 2), returnBook);

module.exports = router;