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

User.hasMany(Cigar)
Cigar.belongsTo(User)

User.hasMany(Bar)
Bar.belongsTo(User)

// Cigar.belongsToMany(Bar)
// Bar.belongsToMany(Cigar)

syncDb(sequelize, true)

module.exports = { User, Cigar, Bar }