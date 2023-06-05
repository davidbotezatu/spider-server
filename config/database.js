require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRESQL_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Set to `false` if your SSL certificate is self-signed or not trusted
    },
  },
});

module.exports = sequelize;
