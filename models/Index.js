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

// Cigar.hasMany(Ratings)
// Ratings.belongsTo(Cigar)

User.hasMany(Bar)
Bar.belongsTo(User)

// Bar.hasMany(Ratings)
// Ratings.belongsTo(Bar)

// User.hasMany(Cigar)
// Cigar.belongsToMany(User , {through: Humidor})

// User.hasMany(Bar)
// Bar.belongsToMany(User , {through: TobaccoBar})


syncDb(sequelize, { alter:true })

module.exports = { User, Cigar, Bar }