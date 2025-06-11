const { user, role } = require("../models/database");

const getUser = async (req, res) => {
  try {
    const userData = await user.findOne({
      where: { idUser: req.user.idUser },
      attributes: { exclude: ["password"] },
      include: {
        model: role,
        as: "role",
        attributes: ["name"]
      }
    });

    if (!userData) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({
      msg: "Información del perfil",
      data: userData
    });
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = { getUser };