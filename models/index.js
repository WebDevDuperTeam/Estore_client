const Sequelize = require('sequelize');
const initModels = require('./init-models');
const sequelize = new Sequelize('CLOTHESSTOREWEB', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    sequelize,
    models: initModels(sequelize),
};