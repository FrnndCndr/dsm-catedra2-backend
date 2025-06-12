require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { user } = require("../models/database");

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = validator.trim(email);
    password = validator.trim(password);

    if (!email || !password) {
      return res.status(400).json({ msg: "Email y contraseña son obligatorios" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Correo electrónico inválido" });
    }

    const user_ = await user.findOne({
      where: { email },
      include: { association: "role" }
    });

    if (!user_) {
      return res.status(404).json({ msg: "Credenciales incorrectas." });
    }

    const validPassword = await bcrypt.compare(password, user_.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Credenciales incorrectas." });
    }

    const token = jwt.sign(
      {
        idUser: user_.idUser,
        email: user_.email,
        role: user_.role.roleId
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.json({
      msg: "Login exitoso",
      token
    });

  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

const register = async (req, res) => {
  try {
    let { name, lastName, email, password } = req.body;
    name = validator.trim(name);
    lastName = validator.trim(lastName);
    email = validator.trim(email);
    password = validator.trim(password);

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (name.length < 2 || lastName.length < 2) {
      return res.status(400).json({ msg: "Nombre y apellido deben tener al menos 2 caracteres" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Correo electrónico inválido" });
    }

    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "El correo ya se encuentra registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      roleId: 2
    });

    return res.status(201).json({
      msg: "Usuario creado exitosamente",
      data: {
        idUser: newUser.idUser,
        name: newUser.name,
        email: newUser.email,
        roleId: newUser.roleId,
      }
    });

  } catch (err) {
    console.error("Error en register:", err);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = {
  login,
  register,
};