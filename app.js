require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { sequelize } = require('./db');
const app = express()
// const port = 3000

;(async() => {
  app.use(express.json())

  // app.use(cors());

  app.use(require('./middleware/headers'))

  const user = require('./controllers/User')
  app.use('/user', user)

  const cigar = require('./controllers/Cigar')
  app.use('/cigar', cigar)

  const bar = require('./controllers/Bar')
  app.use('/bar', bar)

  // const rating = require('./controllers/Rating')
  // app.use('/rating', rating)

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
  })

  // app.listen({ port }, async () => {
  //   console.log(`Example app listening at http://localhost:${port}`)
  //   await sequelize.authenticate()
  //   console.log('Database Connected!')
  // })
})();