require('dotenv').config()
const express = require('express');
const { sequelize } = require('./db');
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  const user = require('./controllers/User')
  app.use('/user', user)

  const cigar = require('./controllers/Cigar')
  app.use('/cigar', cigar)

  const bar = require('./controllers/Bar')
  app.use('/bar', bar)

  // app.listen(port, () => {
  //   console.log(`Example app listening at http://localhost:${port}`)
  // })

  app.listen({ port }, async () => {
    console.log(`Example app listening at http://localhost:${port}`)
    await sequelize.authenticate()
    console.log('Database Connected!')
  })
})();