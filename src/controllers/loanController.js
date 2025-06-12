const { loan, user, book } = require("../models/database");
const validator = require("validator");

const createLoan = async (req, res) => {
  try {
    const { idUser, idBook } = req.body;

    if (!idUser || !idBook) {
      return res.status(400).json({ msg: "Los campos idUser e idBook son obligatorios" });
    }

    if (!validator.isInt(idUser.toString()) || !validator.isInt(idBook.toString())) {
      return res.status(400).json({ msg: "IDs inválidos" });
    }

    const userData = await user.findOne({ where: { idUser } });
    if (!userData) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const bookData = await book.findOne({ where: { idBook, deleted: false, available: true } });

    if (!bookData) {
      return res.status(404).json({ msg: "El libro no está disponible o no existe" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);

    const newLoan = await loan.create({
      idUser,
      idBook,
      startDate,
      endDate,
      state: "prestado",
    });

    await bookData.update({ available: false });

    res.status(201).json({
      msg: "Préstamo registrado correctamente",
      data: newLoan,
    });
  } catch (error) {
    console.error("Error al crear préstamo:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const getAllLoan = async (req, res) => {
  try {
    const whereCondition = req.user.role === 1
      ? {}
      : { idUser: req.user.idUser };

    const loans = await loan.findAll({
      where: whereCondition,
      include: [
        { model: user, as: "user", attributes: ["idUser", "name", "lastName", "email"] },
        { model: book, as: "book", attributes: ["idBook", "title", "author"] }
      ]
    });

    res.json({
      msg: "Préstamos registrados",
      data: loans,
    });
  } catch (error) {
    console.error("Error al listar préstamos:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const getLoanByUserId = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    if (!validator.isInt(usuario_id.toString())) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    const userData = await user.findOne({ where: { idUser: usuario_id } });

    if (!userData) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const loans = await loan.findAll({
      where: { idUser: usuario_id },
      include: [
        { model: book, as: "book", attributes: ["idBook", "title", "author"] }
      ]
    });

    res.json({
      msg: "Préstamos del usuario",
      data: loans,
    });
  } catch (error) {
    console.error("Error al obtener préstamos por usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const loanData = await loan.findOne({ where: { idLoan: id } });

    if (!loanData) {
      return res.status(404).json({ msg: "Préstamo no encontrado" });
    }

    const today = new Date();
    let state = "devuelto";

    if (today > loanData.endDate) {
      state = "con retraso";
    }

    await loanData.update({ state });

    const bookData = await book.findOne({ where: { idBook: loanData.idBook } });
    if (bookData) {
      await bookData.update({ available: true });
    }

    res.json({ msg: `Préstamo actualizado como ${state}` });
  } catch (error) {
    console.error("Error al devolver libro:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  createLoan,
  getAllLoan,
  getLoanByUserId,
  returnBook,
};