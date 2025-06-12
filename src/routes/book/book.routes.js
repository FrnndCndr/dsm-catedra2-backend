const { Router } = require("express");
const {
  createBook,
  getAllBook,
  getBookForId,
  uptadeBook,
  restockeBook,
  deleteBook,
} = require("../../controllers/bookController");

const jwtValidate = require("../../middlewares/jwtValidate");
const accessRole = require("../../middlewares/accessRole");

const router = Router();
router.use(jwtValidate);

//POST /add/book → agregar libro
//● Solo el usuario dentro del sistema puede añadir libros.
//● Se pide el título, autor, género, fecha de publicación.
//● Cuando se crea un libro automáticamente queda disponible.
router.post("/add/book", accessRole(1), createBook);

//GET /books → listar libros
//● Todos los usuarios pueden obtener los libros disponibles en el sistema.
//● Se devuelve toda la información de los libros.
router.get('/books', accessRole(1, 2), getAllBook);
//GET /book/:id → ver detalle
//● Todos los usuarios pueden obtener la información de un libro en específico.
//● Se devuelve toda la información del libro.
router.get('/book/:id', accessRole(1, 2), getBookForId);

//PUT /book/:id → editar información
//● Solo el usuario dentro del sistema puede editar la información de un libro.
router.put('/book/:id', accessRole(1), uptadeBook);
//PUT /restore/book/:id → reintegrar un libro
//● Solo el usuario dentro del sistema puede reintegrar un libro libros.
//● Para reintegrar un libro se requiere cambiar eliminado a falso.
router.put('/restore/book/:id', accessRole(1), restockeBook);

//DELETE /book/:id → eliminar
//● Solo el usuario dentro del sistema puede eliminar la información de un libro.
//● Para eliminar un libro se requiere cambiar eliminado a verdadero.
router.delete('/book/:id', accessRole(1), deleteBook);

module.exports = router;