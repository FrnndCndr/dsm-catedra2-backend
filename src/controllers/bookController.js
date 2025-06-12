const { book } = require("../models/database");
const validator = require("validator");

const createBook = async (req, res) => {
  try {
    const { title, author, gender, date } = req.body;

    if (!title || !author || !gender || !date) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!validator.isDate(date)) {
      return res.status(400).json({ msg: "Fecha de publicación inválida" });
    }

    const newBook = await book.create({
      title,
      author,
      gender,
      date,
      available: true,
      deleted: false,
    });

    res.status(201).json({
      msg: "Libro creado exitosamente",
      data: newBook,
    });
  } catch (error) {
    console.error("Error al crear libro:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const getAllBook = async (req, res) => {
  try {
    const books = await book.findAll({ where: { deleted: false } });
    res.json({
      msg: "Libros disponibles",
      data: books,
    });
  } catch (error) {
    console.error("Error al listar libros:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const getBookForId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isInt(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    const bookData = await book.findOne({ where: { idBook: id, deleted: false } });

    if (!bookData) {
      return res.status(404).json({ msg: "Libro no encontrado" });
    }

    res.json({
      msg: "Libro encontrado",
      data: bookData,
    });
  } catch (error) {
    console.error("Error al obtener libro:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const uptadeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, gender, date, available } = req.body;

    if (!validator.isInt(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    const bookToUpdate = await book.findOne({ where: { idBook: id } });

    if (!bookToUpdate) {
      return res.status(404).json({ msg: "Libro no encontrado" });
    }

    if (!validator.isDate(date)) {
      return res.status(400).json({ msg: "Fecha de publicación inválida" });
    }

    await bookToUpdate.update({
      title,
      author,
      gender,
      date,
      available,
    });

    res.json({
      msg: "Libro actualizado correctamente",
      data: bookToUpdate,
    });
  } catch (error) {
    console.error("Error al actualizar libro:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isInt(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    const bookToDelete = await book.findOne({ where: { idBook: id } });

    if (!bookToDelete) {
      return res.status(404).json({ msg: "Libro no encontrado" });
    }

    await bookToDelete.update({ deleted: true });

    res.json({ msg: "Libro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar libro:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const restockeBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isInt(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    const bookToRestore = await book.findOne({ where: { idBook: id } });

    if (!bookToRestore) {
      return res.status(404).json({ msg: "Libro no encontrado" });
    }

    await bookToRestore.update({ deleted: false });

    res.json({ msg: "Libro reintegrado correctamente" });
  } catch (error) {
    console.error("Error al reintegrar libro:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  createBook,
  getAllBook,
  getBookForId,
  uptadeBook,
  restockeBook,
  deleteBook,
};