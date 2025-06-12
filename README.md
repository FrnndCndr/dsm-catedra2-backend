
# Backend - Biblioteca API

Este backend forma parte del sistema de gestión de préstamos de libros. Está construido con **Node.js**, **Express**, **Sequelize** y utiliza **SQLite** como base de datos. Incluye autenticación JWT, validación básica de datos y control de acceso por roles.

---

## Instalación

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` con el siguiente contenido:

```env
PORT=7070
JWT_SECRET=<tu_token_generado>
NODE_ENV=development
```

Para generar un JWT secreto seguro:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Iniciar el servidor

```bash
npm run dev
```

---

## Comandos útiles

### Migraciones y seeds

```bash
# Aplicar migraciones
npx sequelize-cli db:migrate

# Ejecutar seeders (usuario base, roles y libros iniciales)
npx sequelize-cli db:seed:all

# Deshacer migraciones
npx sequelize-cli db:migrate:undo:all

# Deshacer seeds
npx sequelize-cli db:seed:undo:all
```

---

## Estructura del proyecto

```
dsm-catedra2-backend/
├── app.js
├── package.json
├── .env.example
├── .sequelizerc
└── src/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── migrations/
    ├── models/
    │   └── database/
    ├── routes/
    └── seeders/
```

---

## Dependencias principales

```bash
npm install express cors dotenv jsonwebtoken bcryptjs sequelize sqlite3 sequelize-cli validator nodemon
```
