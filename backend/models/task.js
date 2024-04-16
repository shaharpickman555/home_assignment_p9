const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port:5432,
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

const Task = sequelize.define('task', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending'
  }
});

module.exports = { sequelize, Task };
