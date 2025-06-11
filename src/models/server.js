require('dotenv').config();

const express = require("express");
const cors    = require("cors");
const logger  = require("morgan");
const path    = require("path");
const sequelize = require("./database/sequelize");

const authRoutes = require("../routes/auth/auth.routes");

class Server {
  constructor() {
    console.log("Iniciando Server class");
    this.app  = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      auth: "/api/auth",
    };

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await sequelize.authenticate();
      console.log("Database connected successfully (SQLite)");
    } catch (error) {
      console.error(error);
      throw new Error("Error connecting to the database");
    }
  }

  middlewares() {
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: [
          "http://localhost:7070",
        ],
        credentials: true,
      })
    );
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.json({ message: "API running" });
    });
    this.app.use(this.paths.auth, authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
