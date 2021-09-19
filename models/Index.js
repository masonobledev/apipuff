const { sequelize, syncDb } = require('../db')
const { DataTypes } = require('sequelize')

const DefineUser = require('./User')
const DefineCigar = require('./Cigar')
const DefineBar = require('./Bar')

const User = DefineUser(sequelize, DataTypes) //Defines the model
const Cigar = DefineCigar(sequelize, DataTypes) //Defines the model
const Bar = DefineBar(sequelize, DataTypes) //Defines the model

// User.hasOne(Profile)
// Profile.belongsTo(User)

User.hasMany(Cigar, { foreignKey: 'userId', as: 'posts' })
Cigar.belongsTo(User, { foreignKey: 'userId', as: 'user' })

User.hasMany(Bar)
Bar.belongsTo(User)

// Cigar.belongsToMany(Bar)
// Bar.belongsToMany(Cigar)

syncDb(sequelize, true)

module.exports = { User, Cigar, Bar }