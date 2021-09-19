require('dotenv').config()
const express = require('express');
const { sequelize } = require('./db');
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  const auth = require('./controllers/Auth')
  app.use('/user', auth)

  const post = require('./controllers/Cigar')
  app.use('/cigar', post)

  const spot = require('./controllers/Bar')
  app.use('/bar', spot)

  // app.listen(port, () => {
  //   console.log(`Example app listening at http://localhost:${port}`)
  // })

  app.listen({ port }, async () => {
    console.log(`Example app listening at http://localhost:${port}`)
    await sequelize.authenticate()
    console.log('Database Connected!')
  })
})()