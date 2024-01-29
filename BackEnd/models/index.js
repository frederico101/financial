const sequelize = require('../dataTable/repository/sequelize')
const Sequelize = require('sequelize')
const Customer = require('./customer')

const customer = Customer(sequelize, Sequelize.DataTypes)

const db = {
    Customer,
    sequelize
}

module.exports = db